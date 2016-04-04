import {Observable} from 'rx';
import {hJSX} from '@cycle/dom';
import marked from 'marked';
import convertToVDom from 'html-to-vdom';
import {VNode, VText} from 'virtual-dom';

const convertHTML = convertToVDom({VNode, VText});

export default function MarkdownSection ({DOM, HTTP, props$}) {

    let request$ = props$.map(props => ({url: props.url}));
    let mdSource$ = HTTP
        //.combineLatest(props$, (res$, props) => ({res$, props}))
        .mergeAll()
        // filter out other response streams
        .combineLatest(props$, (res, props) => ({res, props}))
        .filter(({res, props}) => res.request.url === props.url)
        .map(({res}) => res.body.content)
        .map(rawMd => marked(rawMd))
        .startWith('<div></div>')
        .map(md => convertHTML(md));

    const vtree$ = Observable.combineLatest(mdSource$, props$, (mdSource, props) =>
        <section className={props.name.toLowerCase()}>
            {mdSource}
        </section>
    );


    return {
        DOM: vtree$,
        HTTP: request$
    };
};