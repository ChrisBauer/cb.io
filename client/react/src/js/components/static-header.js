import React from 'react';

import {Injector} from 'js-di';
import swapPageC from './swap-page';
import progressTrackerC from './progress-tracker';

const SwapPage = Injector.invoke(swapPageC);
const ProgressTracker = Injector.invoke(progressTrackerC);

export default function StaticHeader () {
    return React.createClass({
        displayName: 'StaticHeader',
        render: function () {
            return (
                <header>
                    <div className="title">Chris Bauer</div>
                    <ProgressTracker />
                    <SwapPage options={this.props.frontEnds} />
                </header>
            );
        }
    });
};
