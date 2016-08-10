/**
 * Created by ndyumin on 09.08.2016.
 */
import Rx from 'rxjs';
import snabbdom from 'snabbdom';

import {EMPTY_MODEL} from './model';

const patch = snabbdom.init([
    require('snabbdom/modules/class'),
    require('snabbdom/modules/props'),
    require('snabbdom/modules/style'),
    require('snabbdom/modules/eventlisteners')
]);

export function view($container, renderer, model$) {
    let vnode = renderer.render(EMPTY_MODEL);
    patch($container, vnode);
    return model$.subscribe(function (model) {
        vnode = patch(vnode, renderer.render(model));
    });
}