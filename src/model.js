/**
 * Created by ndyumin on 10.08.2016.
 */

import {storeR, lens} from 'rstore';
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
    return storeR(EMPTY_MODEL).plug(
        meta$, metaL.set,
        dataSource$, dataL.set
    );
}