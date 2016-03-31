import {Observable} from 'rx';
import {hJSX} from '@cycle/dom';
import MarkdownSection from './markdown-section';

const ABOUT_URL = 'http://chrisbauer.io:9000/rethink/about';
const RESUME_URL = 'http://chrisbauer.io:9000/rethink/resume';

export default function Body ({DOM, HTTP}) {
    const aboutSection = MarkdownSection({DOM, HTTP, props$: Observable.just({
            url: ABOUT_URL,
            name: 'About'
        })
    });

    const resumeSection = MarkdownSection({DOM, HTTP, props$: Observable.just({
            url: RESUME_URL,
            name: 'Resume'
        })
    });

    const aboutVTree$ = aboutSection.DOM;
    const resumeVTree$ = resumeSection.DOM;

    const vtree$ = Observable.combineLatest(
        aboutVTree$,
        resumeVTree$,
        (avtree, rvtree) => <div>
            {avtree}
            {rvtree}
        </div>
    );

    return {
        DOM: vtree$,
        HTTP: Observable.merge(aboutSection.HTTP, resumeSection.HTTP)
    };
};