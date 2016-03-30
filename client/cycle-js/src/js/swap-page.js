import {Observable} from 'rx';
import {hJSX} from '@cycle/dom';
import classNames from 'classnames';

function intent (sources) {
    const swapPageEl = sources.DOM.select('.swap-page');
    const active$ = Observable.merge(
        swapPageEl.events('mouseenter'),
        swapPageEl.events('mouseleave')
        )
        .filter(ev => ev.target.classList.contains('swap-page'))
        .map(ev => ev.type === 'mouseenter')
        .startWith(false);

    const anchor$ = sources.DOM.select('a')
        .events('click')
        .map(ev => ev.preventDefault() || ev)
        .combineLatest(active$, (ev, active) => ({el: ev.currentTarget, active}))
        .filter(({active}) => active === true)
        .map(({el}) => {
            console.log(el);
        });

    return {
        active$: active$,
        options$: sources.options$
    };
}

function model (actions) {
    return Observable.combineLatest(actions.active$, actions.options$, (active, options) => ({active, options}));
}

function view (state$) {
    const vtree$ = state$.map(({active, options}) => {
            let classes = classNames({
                'swap-page': true,
                'active': active
            });
            let repeat = Object.keys(options)
                .map(key => options[key])
                .map(option =>
                    <div className="option">
                        <a title={option.title} data-loc={option.location}>{option.title} </a>
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

    return {
        DOM: vtree$
    };
}


export default function SwapPage (sources) {
    return view(model(intent(sources)));
}