/**
 * Created by ndyumin on 09.08.2016.
 */
import Rx from 'rxjs';
import {curry} from 'ramda';
import snabbdom from 'snabbdom';
import h from  'snabbdom/h';
import {storeRx, lens} from 'rstore';

const dataL = lens('data');
const metaL = lens('meta');

const patch = snabbdom.init([
    require('snabbdom/modules/class'),
    require('snabbdom/modules/props'),
    require('snabbdom/modules/style'),
    require('snabbdom/modules/eventlisteners')
]);

/**
 *
 * column API
 *
 * - string id
 * - string name
 * - function dataCellRenderer
 * - function headerCellRenderer
 *
 */

const emptyModel = {
    meta: {
        columns: []
    },
    data: {
        items: [],
        count: 0
    }
};

export function model(meta$, dataSource$) {
    return storeRx(emptyModel).plug(
        meta$, metaL.set,
        dataSource$, dataL.set
    );
}

const isVisible = c => c.visible;
const methodOrFunction = curry((key, obj, func) =>
    typeof obj[key] === 'function' ? obj[key] : func);

const customRendererIfAvailable = methodOrFunction('dataCellRenderer');
const customHeaderRendererIfAvailable = methodOrFunction('headerCellRenderer');

const textCellRenderer = value => h('td.text-cell', value);

const renderHeaderCell = c => customHeaderRendererIfAvailable(c, textCellRenderer)(c.name);
const renderDataCell = ({column, value}) => customRendererIfAvailable(column, textCellRenderer)(value);

const renderHeader = model => h('thead', [
    h('tr', model.meta.columns.filter(isVisible).map(renderHeaderCell))
]);

const renderBody = model => h('tbody',
    model.data.items.map(entry =>
        h('tr',
            model.meta.columns
                .filter(isVisible)
                .map(column => ({column, value: entry[column.id]}))
                .map(renderDataCell))));

const render = model => h('table.vtable', [
    renderHeader(model),
    renderBody(model)
]);

export function view($container, model$) {
    let vnode = render(emptyModel);
    patch($container, vnode);
    return model$.subscribe(function (model) {
        vnode = patch(vnode, render(model));
    });
}