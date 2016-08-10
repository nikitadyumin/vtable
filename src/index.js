import {view, model} from './vtable';
import {mock, meta, shuffle} from './mockups';
import Rx from 'rxjs';
import rstore from 'rstore';
import h from 'snabbdom/h';

const data$ = Rx.Observable.of(mock());

const meta_ = meta();
meta_.columns[4].dataCellRenderer = value => h('td', value.toUpperCase());
meta_.columns[3].headerCellRenderer = value => h('td', value.toLowerCase());

const meta$ = Rx.Observable.interval(500)
    .map(() => ({columns: shuffle(meta_.columns)}));

const $container = document.getElementById('table');
view($container, model(meta$, data$));



