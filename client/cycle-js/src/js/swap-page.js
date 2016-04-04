import {Observable} from 'rx';
import {hJSX} from '@cycle/dom';
import classNames from 'classnames';

function intent (sources) {
    const swapPageEl = sources.DOM.select('.swap-page');
    const active$ = Observable.merge(
        swapPageEl.events('mouseenter'),
        swapPageEl.events('mouseleave')
        )
        // only take action if it's an event from the root (.swap-page) element AND IF it's leaving,
        // it's leaving to an element outside of the dropdown
        .filter(ev => ev.target.classList.contains('swap-page') &&
            (ev.type === 'mouseleave' ? !ev.currentTarget.contains(ev.toElement) : true)
        )
        .map(ev => ev.type === 'mouseenter')
        .startWith(false);

    const anchor$ = sources.DOM.select('.swap-page .option a')
        .events('click', true)
        .map(ev => ev.preventDefault() || ev)
        .combineLatest(active$, (ev, active) => ({el: ev.currentTarget, active}))
        // filter out clicks when the dropdown is not "active"
        .filter(({active}) => active === true)
        //TODO: this is pretty side-effect-y - how to break it out?
        .map(({el}) => window.location.href = el.dataset.rel)
        .startWith('');

    return {
        active$: active$,
        options$: sources.options$,
        anchor$: anchor$
    };
}

function model ({active$, options$, anchor$}) {
    return Observable.combineLatest(active$, options$, anchor$, (active, options, anchor) => ({active, options, anchor}));
}

function view (state$) {
    const vtree$ = state$.map(({active, options, anchor}) => {
            let classes = classNames({
                'swap-page': true,
                'active': active
            });
            let repeat = Object.keys(options)
                .map(key => options[key])
                .map(option =>
                    <div className="option">
                        <a title={option.title} attributes={{'data-rel': option.location }}>{option.title} </a>
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