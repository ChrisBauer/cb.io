import {Observable} from 'rx';
import {h} from '@cycle/dom';
import marked from 'marked';

export default function MarkdownSection ({DOM, HTTP, props$}) {

    let request$ = props$.map(props => ({url: props.url}));
    let mdSource$ = HTTP
        //.combineLatest(props$, (res$, props) => ({res$, props}))
        .mergeAll()
        .combineLatest(props$, (res, props) => ({res, props}))
        .filter(({res, props}) => res.request.url === props.url)
        .map(({res}) => res.body.content)
        .map(rawMd => marked(rawMd))
        .startWith('');

    const vtree$ = Observable.combineLatest(mdSource$, props$, (mdSource, props) => {
        return h('section.' + props.name.toLowerCase(), [
            mdSource
            ]);
    });


    return {
        DOM: vtree$,
        HTTP: request$
    };
};