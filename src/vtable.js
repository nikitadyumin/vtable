/**
 * Created by ndyumin on 09.08.2016.
 */
import Rx from 'rxjs';
import {storeRx, lens} from 'rstore';
import {curry} from 'ramda';
import snabbdom from 'snabbdom';
import Renderer from './Renderer';

import {EMPTY_MODEL, model} from './model';

const limitL = lens('limit');
const columnsL = lens('columns');
const filtersL = lens('filters');

const patch = snabbdom.init([
    require('snabbdom/modules/class'),
    require('snabbdom/modules/props'),
    require('snabbdom/modules/style'),
    require('snabbdom/modules/eventlisteners')
]);

export function view($container, renderer, model$) {
    let vnode = renderer.render(EMPTY_MODEL);
    patch($container, vnode);
    return model$.subscribe(function (model) {
        vnode = patch(vnode, renderer.render(model));
    });
}

function runWith(...args) {
    return function (f) {
        if (typeof f === 'function') {
            f(...args);
        }
    }
}

const DEFAULT_OPTIONS = {
    renderer: new Renderer(),
    meta: {
        columns: []
    },
    data: {
        items: [],
        count: 0
    },
    plugins: []
};

export function table($container, opts) {
    const options = Object.assign({}, DEFAULT_OPTIONS, opts);
    const meta$ = storeRx(options.meta);
    const data$ = storeRx(options.data);

    options.plugins.forEach(runWith(meta$, data$));
    const _model = model(meta$, data$);
    view($container, options.renderer, _model);
}
export class Table {
    constructor($container, columns_, data_) {
        return new TableBuilder($container)
            .setPlugins(
                columns(Rx.Observable.of(columns_)),
                dataset(Rx.Observable.of(data_))
            ).build();
    }
}

export class TableBuilder {
    constructor($container) {
        this.$container = $container;
        this.options = Object.assign({}, DEFAULT_OPTIONS);
    }

    build() {
        return table(this.$container, this.options);
    }

    setPlugins(...plugins) {
        this.options.plugins = plugins;
        return this;
    }

    setRenderer(renderer) {
        this.options.renderer = renderer;
        return this;
    }
}

export const dataset = curry((dataset$, meta$, data$) => {
    const result$ = dataset$.combineLatest(meta$.toRx(Rx))
        .map(([data, {limit, offset, filters}]) => ({
            items: data
                .filter(item => {
                    if (filters) {
                        return filters.every(({key,value}) => item[key] === value)
                    } else {
                        return true;
                    }
                })
                .slice(offset, limit),
            count: data.length
        }));
    data$.plug(result$, (s, u) => u);
});

const comparer = (o1, o2) => JSON.stringify(o1) === JSON.stringify(o2);
const selector = ({limit, offset, filters}) => ({limit, offset, filters});

export const ajax = curry((options$, meta$, data$) => {
    const reqOptions$ = meta$.toRx(Rx)
        .map(selector)
        .distinctUntilChanged(comparer);

    const response$ = options$.combineLatest(reqOptions$).switchMap(([opts, {limit, offset, filters}]) => {
        const aQuery = [];
        if (limit) {
            aQuery.push('_limit=' + limit);
        }
        if (offset) {
            aQuery.push('_start=' + offset);
        }
        if (filters && filters.length) {
            aQuery.push(...filters.map(({key, value}) => `${key}=${value}`));
        }
        const sQuery = aQuery.join('&');
        return Rx.Observable.fromPromise(fetch(opts.url + (sQuery ? '?' + sQuery : ''))
            .then(data => data.json()));
    });

    data$.plug(response$, (s, u) => ({
        items: u,
        count: u.length
    }));
});

export const paging = curry((options$, meta$, data$) =>
    meta$.plug(options$, (meta, opts) => limitL.set(meta, opts.size)));

export const filtering = curry((options$, meta$, data$) =>
    meta$.plug(options$, filtersL.set));

export const columns = curry((options$, meta$, data$) =>
    meta$.plug(options$, columnsL.set));