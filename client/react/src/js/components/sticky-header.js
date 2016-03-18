import React from 'react';

import {Injector} from 'js-di';
import swapPageC from './swap-page';
import progressTrackerC from './progress-tracker';

const SwapPage = Injector.invoke(swapPageC);
const ProgressTracker = Injector.invoke(progressTrackerC);

import classNames from 'classnames';

const BREAKPOINT_MEDIA_QUERY = 'min-width: 600px';
const HEADER_FULL_HEIGHT = 240;
const HEADER_MIN_HEIGHT = 60;

function StickyHeader (EventRegistrar, WatchBrowserSize) {
    let headerElement = null;

    return React.createClass({
        displayName: 'StickyHeader',
        getInitialState: function getInitialState () {
            this.setupScrollHandler();
            this.setupSizeListener();
            return {
                isVisible: this.isVisible()
            };
        },
        isVisible: function isVisible () {
            return (document.documentElement.scrollTop || document.body.scrollTop) > 
                (this.state && this.state.fullHeader ? HEADER_FULL_HEIGHT : HEADER_MIN_HEIGHT);
        },
        setupScrollHandler: function setupScrollHandler () {
            EventRegistrar.register(window, 'onscroll', () => {
                if (this.isVisible() !== this.state.isVisible) {
                    this.setState({isVisible: !this.state.isVisible});
                }
            });
        },
        setupSizeListener: function setupSizeListener () {
            WatchBrowserSize.addQuery(BREAKPOINT_MEDIA_QUERY, (aboveMinWidth) => {
                this.setState({
                    fullHeader: aboveMinWidth
                });

                this.setState({
                    isVisible: this.isVisible()
                });
            });
        },
        render: function render () {
            let classes = classNames({
                sticky: true,
                visible: this.state.isVisible
            });
            return (
                <header className={classes}>
                    <div className="title">Chris Bauer</div>
                    <ProgressTracker />
                    <SwapPage options={this.props.frontEnds} />
                </header>
            );
        }
    });
}

StickyHeader._inject = ['EventRegistrar', 'WatchBrowserSize'];

export default StickyHeader;
