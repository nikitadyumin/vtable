/**
 * Created by ndyumin on 09.08.2016.
 */
import Rx from 'rxjs';
import snabbdom from 'snabbdom';
import h from  'snabbdom/h';
import {storeRx, lens} from 'rstore';

const dataL = lens('items');
const metaL = lens('meta');

const patch = snabbdom.init([
    require('snabbdom/modules/class'),
    require('snabbdom/modules/props'),
    require('snabbdom/modules/style'),
    require('snabbdom/modules/eventlisteners')
]);

const emptyModel = {
    meta: {
        columns: []
    },
    items: {
        data: [],
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

const customRendererIfAvailable = (column, defaultRenderer) =>
    typeof column.renderer === 'function'
        ? column.renderer
        : defaultRenderer;

const textCellRenderer = value => h('td.text-cell', value);

const renderHeaderCell = c => h('td.header-cell', [c.name]);
const renderDataCell = ({column, value}) => customRendererIfAvailable(column, textCellRenderer)(value);

const renderHeader = model => h('thead', [
    h('tr', model.meta.columns.filter(isVisible).map(renderHeaderCell))
]);

const renderBody = model => h('tbody',
    model.items.data.map(entry =>
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