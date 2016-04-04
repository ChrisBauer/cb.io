import {Observable} from 'rx';
import {hJSX} from '@cycle/dom';
import EventRegistrar from '../../../shared/src/js/event-registrar';
const registrar = new EventRegistrar();

export default function ProgressTracker (sources) {
    const wrappedRegister = Observable.fromCallback(registrar.register, registrar);
    const windowScroll$ = wrappedRegister(window, 'onscroll');

    windowScroll$.map(a => console.log(a))
        .startWith(<div></div>)
        .subscribe(function (a) {
            console.log(a);
            return a;
        });
    return {
        DOM: windowScroll$
    };
}