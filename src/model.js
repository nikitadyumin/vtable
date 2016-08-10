/**
 * Created by ndyumin on 10.08.2016.
 */

import {storeRx, lens} from 'rstore';
const dataL = lens('data');
const metaL = lens('meta');

export const EMPTY_MODEL = {
    meta: {
        columns: []
    },
    data: {
        items: [],
        count: 0
    }
};

export function model(meta$, dataSource$) {
    return storeRx(EMPTY_MODEL).plug(
        meta$, metaL.set,
        dataSource$, dataL.set
    );
}