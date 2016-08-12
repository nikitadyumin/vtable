import {mock, meta, shuffle, randomVisibility} from './mockups';
import Rx from 'rxjs';
import rstore from 'rstore';
import h from 'snabbdom/h';

import {table, TableBuilder, ajax, dataset, paging, filtering, columns} from './vtable';
import Renderer from './Renderer';

const $container = document.getElementById('table');

const paging$ = Rx.Observable.of({
    size: 3
});
//const sum = (x,y) => x + y;
//const paging$ = Rx.Observable.interval(500).map(()=>1).scan(sum).map(val => ({
//    size: val %5
//}));
const url$ = Rx.Observable.of({
    url: 'http://jsonplaceholder.typicode.com/comments'
});

const columns$ = Rx.Observable.interval(1000).map(() => (([
    {
        id: "id",
        name: "ID",
        visible: true
    },
    {
        id: "name",
        name: "123123",
        visible: true
    },
    {
        id: "postId",
        name: "postId",
        visible: true
    },
    {
        id: "email",
        name: "email",
        visible: false
    }
])));

const filtering$ = Rx.Observable.of([
    {
        key: 'postId',
        value: 2
    }
]);

const data$ = Rx.Observable.of([
    {
        postId: 1,
        id: 1,
        name: 'ok'
    },
    {
        postId: 2,
        id: 2,
        name: 'ok'
    },
    {
        postId: 2,
        id: 3,
        name: 'ok'
    },
    {
        postId: 2,
        id: 4,
        name: 'ok'
    },
    {
        postId: 2,
        id: 10,
        name: 'not ok'
    },
    {
        postId: 1,
        id: 10,
        name: 'ok'
    }
]);

class CustomRenderer extends Renderer {
    renderHeaderCell(column) {
        return h('td.header-cell', column.name.toUpperCase());
    }
}

//table(
//    $container,
//    {
//        renderer: new CustomRenderer(),
//        plugins: [
//            paging(paging$),
//            filtering(filtering$),
//            columns(columns$),
//            //dataset(data$)
//            ajax(url$)
//        ]
//    }
//);

new TableBuilder($container)
    .setRenderer(new CustomRenderer())
    .setPlugins(
        //paging(paging$),
        //filtering(filtering$),
        columns(columns$),
        ajax(url$)
    ).build();

