/**
 * Created by ndyumin on 10.08.2016.
 */

/**
 *
 * column API
 *
 * - string id
 * - string name
 * - boolean visible
 *
 */
import h from 'snabbdom/h';

export default class Renderer {
    render(model) {
        return h('table.vtable', [
            this.renderHeader(model),
            this.renderBody(model)
        ]);
    }

    renderHeader (model) {
        return h('thead', [
            h('tr', model.meta.columns.filter(this.isColumnVisible).map(this.renderHeaderCell))
        ]);
    };

    renderBody (model) {
        return h('tbody',
            model.data.items.map(entry =>
                h('tr',
                    model.meta.columns
                        .filter(this.isColumnVisible)
                        .map(column => ({column, value: entry[column.id]}))
                        .map(this.renderDataCell))));
    }

    renderHeaderCell(column) {
        return h('td.header-cell', column.name);
    }

    renderDataCell({column, value}) {
        return h('td.text-cell', value);
    }

    isColumnVisible(column) {
        return column.visible;
    }
}