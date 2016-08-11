import {mock, meta, shuffle} from './mockups';
import Rx from 'rxjs';
import rstore from 'rstore';
import h from 'snabbdom/h';

import {table, ajax, paging, filtering} from './vtable';

const $container = document.getElementById('table');

const paging$ = Rx.Observable.of({
    size: 5
});
const url$ = Rx.Observable.of({
    url : 'http://jsonplaceholder.typicode.com/comments'
});

const filtering$ = Rx.Observable.of([
    {
        key: 'postId',
        value: 2
    },
    {
        key: 'id',
        value: 10
    }
]);

table(
    $container,
    [
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
            visible: true
        }
    ],
    paging(paging$),
    filtering(filtering$),
    ajax(url$)
);
