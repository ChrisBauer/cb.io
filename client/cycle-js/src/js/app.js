import Cycle from '@cycle/core';
import {makeDOMDriver, hJSX} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';
import Header from './header';

function main (sources) {

    const HeaderSinks = Header(sources);
    const HeaderVTree = HeaderSinks.DOM;

    return {
        DOM: HeaderVTree,
        HTTP: HeaderSinks.HTTP
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
        
