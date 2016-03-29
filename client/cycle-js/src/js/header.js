import Cycle from '@cycle/core';
import {Observable} from 'rx';
import {hJSX} from '@cycle/dom';
import classNames from 'classnames';

export default function Header (sources) {

    const FRONT_ENDS_URL = 'http://chrisbauer.io:9000/rethink/frontEnds';
    let request$ = Observable.just({url: FRONT_ENDS_URL});
    let frontEnds$ = sources.HTTP
        .filter(res$ => res$.request.url === FRONT_ENDS_URL)
        .mergeAll()
        .map(res => res.body.frontEnds)
        .startWith([]);

    const swapPageEl = sources.DOM.select('.swap-page');
    const active$ = Observable.merge(
            swapPageEl.events('mouseenter'),
            swapPageEl.events('mouseleave')
        )
        .filter(ev => ev.target.classList.contains('swap-page'))
        .map(ev => {
            return ev.type === 'mouseenter'
        })
        .startWith(false);


    const swapPageVTree$ = Observable.combineLatest(frontEnds$, active$, (frontEnds, active) =>
        {
            let classes = classNames({
                'swap-page': true,
                'active': active
            });
            let repeat = Object.keys(frontEnds)
                .map(frontEndKey => frontEnds[frontEndKey])
                .map(frontEnd =>
                    <div className="option">
                        <a title={frontEnd.title} href={frontEnd.location}>{frontEnd.title} </a>
                    </div>
                );
            return <div className={classes}>
                    {repeat}
                </div>;
        })
        .startWith(
            <div className="swap-page">
                <div className="option"><a>CycleJS </a></div>
            </div>
        );

    const vtree$ = swapPageVTree$
        .map( (swapPageVTree) =>
            <header className="sticky-header">
                <div className="title">Chris Bauer</div>
                <div className="progress-tracker">
                    <div className="option selected"><a>About </a></div>
                </div>
                {swapPageVTree}
            </header>
        )

    return {
        DOM: vtree$,
        HTTP: request$
    };
}
