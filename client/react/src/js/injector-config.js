import {Injector} from 'js-di';
import EventRegistrar from '../../../dist/js/event-registrar';
import {ScrollKeeper} from './scroll-keeper';
import {WatchBrowserSize} from 'watch-browser-size';

let initialized = false;
function init () {
    if (initialized) {
        return;
    }

    const registrar = function () { return new EventRegistrar() };

    Injector.register({
        ScrollKeeper: ScrollKeeper,
        EventRegistrar: registrar,
        WatchBrowserSize: WatchBrowserSize
    });
}

init();

export default function noop () {};
