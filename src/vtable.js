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

export function table($container, columns, ...controllers) {
    const meta$ = storeRx({
        columns
    });
    const data$ = storeRx({
        items: [],
        count: 0
    });
    controllers.forEach(runWith(meta$, data$));
    const _model = model(meta$, data$);
    view($container, new Renderer(), _model);
}

export const ajax = curry((options$, meta$, data$) => {
    const response$ = options$.combineLatest(meta$.toRx(Rx))
        .switchMap(([opts, {limit, offset, filters}]) => {
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
