import React from 'react';
import marked from 'marked';
import {Injector} from 'js-di';
import anchorC from './anchor';

const Anchor = Injector.invoke(anchorC);

import {HTTP} from '../utils/http';
let http = new HTTP();

export default function Section () {
    return React.createClass({
        displayName: 'Section',
        render: function () {
            const lc = this.props.title.toLowerCase();
            const dangerousMarkdown = { __html: marked.parse(this.props.mdContent)};
            return (
                    <section className={lc}>
                        <Anchor anchorId={lc} anchorTitle={this.props.title} />
                        <h3>{this.props.title}</h3>
                        <p dangerouslySetInnerHTML={dangerousMarkdown} />
                    </section>
            );
        }
    });
};
