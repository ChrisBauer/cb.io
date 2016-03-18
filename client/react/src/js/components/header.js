import React from 'react';
import {Injector} from 'js-di';

import staticHeaderC from './static-header';
import stickyHeaderC from './sticky-header';

const StaticHeader = Injector.invoke(staticHeaderC);
const StickyHeader = Injector.invoke(stickyHeaderC);

import {UrlConstants, AppConstants} from '../Constants';
import Utils from '../../../../dist/js/utils';
import {HTTP} from '../utils/http';

const http = new HTTP();


export default function Header () { 
    return React.createClass({
        displayName: 'Header',
        getInitialState: function () {
            http.get(UrlConstants.FRONT_ENDS_URL)
                .then(http.parseJSON)
                .then(result => Utils.processFrontEnds(result.data.frontEnds, AppConstants.REACT_NAME))
                .then(frontEnds => {
                    this.setState({
                        frontEnds: frontEnds
                    });
                })
                .catch(errResult => {
                    console.error(errResult.status, errResult.data);
                });
            return {frontEnds: [{title: 'React', location: '#'}] };
        },
        render: function () {
            return (
                <div className="header-wrapper">
                    <StaticHeader frontEnds={this.state.frontEnds} />
                    <StickyHeader frontEnds={this.state.frontEnds} />
                </div>
            );
        }
    })
};
