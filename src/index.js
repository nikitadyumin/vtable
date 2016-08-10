import {view, model} from './vtable';
import Rx from 'rxjs';
import rstore from 'rstore';
import h from 'snabbdom/h';

const data = {
    data: [],
    count: 0
};

const dateRenderer = value => h('td', new Date(value).getTime());

const data$ = Rx.Observable.of(data);
const meta = ({
    columns: [
        {
            visible: false,
            name: 'id',
            id: '_id'
        },
        {
            visible: true,
            name: 'Type',
            id: 'Type'
        },
        {
            visible: true,
            name: 'Sender',
            id: 'Sender'
        },
        {
            visible: true,
            name: 'Receiver',
            id: 'Receiver'
        },
        {
            visible: true,
            renderer: dateRenderer,
            name: 'DocumentDate',
            id: 'DocumentDate'
        }
    ]
});

function shuffle(arr) {
    const res = arr.slice(0);
    const length = res.length;
    for (let i = 0; i < length; i++) {
        const t = res[i];
        const randomPos = Math.floor(Math.random() * (length - i)) + i;
        res[i] = res[randomPos];
        res[randomPos] = t;
    }
    return res.map(c => {
        c.visible = Math.random() > 0.25;
        return c;
    });
}

const meta$ = Rx.Observable.interval(500).map(() => {
    return {columns : shuffle(meta.columns)};
});

const $container = document.getElementById('table');
view($container, model(meta$, data$));



