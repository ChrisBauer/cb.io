import Cycle from '@cycle/core';
import {Observable} from 'rx';
import {makeDOMDriver, hJSX} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';
import Header from './header';
import Body from './body';

function main (sources) {

    const header = Header(sources);
    const headerVTree$ = header.DOM;
    
    const body = Body(sources);
    const bodyVTree$ = body.DOM;

    const vtree$ = Observable.combineLatest(
        headerVTree$,
        bodyVTree$,
        (hvtree, bvtree) => <div>
            {hvtree}
            {bvtree}
        </div>
    );

    const http$ = Observable.merge(header.HTTP, body.HTTP);

    return {
        DOM: vtree$,
        HTTP: http$
        /* DOM: sources.DOM.select('h4').events('click')
            .map(ev => 1)
            .startWith(0)
            .scan( (prev, add) => prev + add)
            .combineLatest(HeaderVTree, (val, vtree) =>
                <div>
                    <h4>Test {val}</h4>
                    {vtree}
                </div>
            )
        */
    };
}

const drivers = {
    DOM: makeDOMDriver('.main'),
    HTTP: makeHTTPDriver()
};

Cycle.run(main, drivers);
        
