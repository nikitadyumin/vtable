import {mock, meta, shuffle, randomVisibility} from './mockups';
import Rx from 'rxjs';
import rstore from 'rstore';
import h from 'snabbdom/h';

import {
    table,
    TableBuilder,
    ajax,
    dataset,
    paging,
    filtering,
    ordering,
    displayValue,
    columns
} from './vtable';

import Renderer from './Renderer';

const $container = document.getElementById('table');

const paging$ = Rx.Observable.of({
    limit: 53,
    offset: 1
});
//const sum = (x,y) => x + y;
//const paging$ = Rx.Observable.interval(500).map(()=>1).scan(sum).map(val => ({
//    size: val %5
//}));
const url$ = Rx.Observable.of({
    url: 'http://jsonplaceholder.typicode.com/comments'
});

const ordering$ = Rx.Observable.of([
    {
        key: 'postId',
        value: 1
    }
]);

const dict$ = Rx.Observable.of({
    postId: {
        1: 'one',
        2: 'two',
        6: 'six'
    },
    id: {
        4: 'FOUR'
    }
});

const columns$ = Rx.Observable.interval(1000).map(() => (shuffle([
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
    ])))
    .combineLatest(dict$)
    .map(([cols, dict]) => {
        cols.forEach(col => col.dict = dict[col.id]);
        return cols;
    });

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

    renderDataCell({column, value}) {
        const displayValue = column.dict
            ? typeof column.dict[value] !== 'undefined'
                ? column.dict[value]
                : value
            : value;

        return h('td.text-cell', displayValue);
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
        paging(paging$),
        //filtering(filtering$),
        ordering(ordering$),
        columns(columns$),
        ajax(url$),
        displayValue(dict$)
    ).build();

