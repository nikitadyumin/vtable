import {mock, meta, shuffle} from './mockups';
import Rx from 'rxjs';
import rstore from 'rstore';
import h from 'snabbdom/h';

import {view} from './vtable';
import {model} from './model';
import Renderer from  './renderer';

class CustomRenderer extends Renderer {
    renderDataCell({column, value}) {
        return h('td', [
            column.name === 'A' ? value.toUpperCase() : value
        ]);
    }
    renderHeaderCell(column) {
        return h('td', [
            column.name === 'D' ? h('b', ['sdfsdf']) : column.name
        ]);
    }
}

const data$ = Rx.Observable.of(mock());

const meta$ = Rx.Observable.interval(500)
    .map(() => ({columns: shuffle(meta().columns)}));

const $container = document.getElementById('table');
const renderer = new CustomRenderer();
view($container, renderer, model(meta$, data$));



