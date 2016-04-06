import React from 'react';
import {UrlConstants} from '../Constants';
import {Injector} from 'js-di';

import sectionC from './section';
const Section = Injector.invoke(sectionC);

import {HTTP} from '../utils/http';
let http = new HTTP();

export default function Body () {
    return React.createClass({
        displayName: 'body',
        getInitialState: function () {
            http.get(UrlConstants.RETHINK_BASE_URL + UrlConstants.ABOUT_URL)
                .then(http.parseJSON)
                .then(result => {
                    this.setState({about: {title: 'About', mdContent: result.data.content}});
                })
                .catch(errResult => {
                    console.error(errResult.status, errResult.data);
                });

            http.get(UrlConstants.RETHINK_BASE_URL + UrlConstants.EXPERIENCE_URL)
                .then(http.parseJSON)
                .then(result => {
                    this.setState({sections: result.data.experience});
                })
                .catch(errResult => {
                    console.error(errResult.status, errResult.data);
                });

            return {
                about: {
                    mdContent: '',
                    title: 'About'
                },
                sections: []
            };
        },
        render: function () {
            let i = 1;
            const sections = this.state.sections.map(section => (
                <Section key={'section-' + i++} title={section.title} mdContent={section.content} />
            ));
            return (
                <div>
                    <Section key="section-0" title={this.state.about.title} mdContent={this.state.about.mdContent} />
                    <section><h3>Work Experience</h3></section>
                    {sections}
                </div>
            )
        }
    });
};