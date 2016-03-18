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
        getInitialState: function () {
            http.get(this.props.contentUrl)
                .then(http.parseJSON)
                .then(result => {
                    this.setState({content: this.generateMarkdown(result.data.content)});
                })
                .catch(errResult => {
                    console.error(errResult.status, errResult.data);
                });
            return {content: {__html: ''}};
        },
        generateMarkdown: function (mdContent) {
            return { __html: marked(mdContent, {sanitize: true}) };
        },
        render: function () {
            const lc = this.props.title.toLowerCase();
            return (
                
                    <section className={lc}>
                        <Anchor anchorId={lc} anchorTitle={this.props.title} />
                        <h3>{this.props.title}</h3>
                        <p dangerouslySetInnerHTML={this.state.content} />
                    </section>
            );
        }
    });
};
