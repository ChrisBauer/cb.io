import {Observable} from 'rx';
import {hJSX} from '@cycle/dom';
import ProgressTracker from './progress-tracker';

import SwapPage from './swap-page';

export default function Header (sources) {

    const FRONT_ENDS_URL = 'http://chrisbauer.io:9000/rethink/frontEnds';
    let request$ = Observable.just({url: FRONT_ENDS_URL});
    let frontEnds$ = sources.HTTP
        .filter(res$ => res$.request.url === FRONT_ENDS_URL)
        .mergeAll()
        .map(res => res.body.frontEnds)
        .startWith([]);
    
    const swapPage = SwapPage({DOM: sources.DOM, options$: frontEnds$});
    const swapPageVTree$ = swapPage.DOM;

    const progressTracker = ProgressTracker ({DOM: sources.DOM});
    const progressTrackerVTree$ = progressTracker.DOM;

    const vtree$ = Observable.combineLatest(swapPageVTree$, progressTrackerVTree$,
        (swapPageVTree, progressTrackerVTree) => ({swapPageVTree, progressTrackerVTree}))
        .map( ({swapPageVTree, progressTrackerVTree}) =>
            <header className="header">
                <div className="title">Chris Bauer</div>
                <div className="progress-tracker">
                    <div className="option selected"><a>About </a></div>
                </div>
                {swapPageVTree}
            </header>
        );

    return {
        DOM: vtree$,
        HTTP: request$
    };
}
