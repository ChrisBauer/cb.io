import React from 'react';

import {Injector} from 'js-di';
import swapPageC from './swap-page';
import progressTrackerC from './progress-tracker';

const SwapPage = Injector.invoke(swapPageC);
const ProgressTracker = Injector.invoke(progressTrackerC);

import classNames from 'classnames';
import {StyleConstants} from '../Constants';

function StickyHeader (EventRegistrar, WatchCSSMedia) {
    let headerElement = null;

    return React.createClass({
        displayName: 'StickyHeader',
        getInitialState: function getInitialState () {
            this.setupScrollHandler();
            return {
                isVisible: false
            };
        },
        isVisible: function isVisible () {
            return (document.documentElement.scrollTop || document.body.scrollTop) > this.state.headerOffset;
        },
        setupScrollHandler: function setupScrollHandler () {
            EventRegistrar.register(window, 'onscroll', () => {
                this.setState({isVisible: this.isVisible(this.state.headerOffset)});
            });
        },
        setupSizeListener: function setupSizeListener () {
            WatchCSSMedia.onWidthGreaterThan(StyleConstants.WIDTH_BREAKPOINT, (event) => {
                // update the headerOffset state value
                this.setState({
                    headerOffset: event.matches ? StyleConstants.FULL_HEADER_OFFSET : StyleConstants.SMALL_HEADER_OFFSET,
                });

                // because isVisible() relies on state, there must be sequential calls to
                // .setState(). An alternative would be to stash headerOffset in a local
                // variable, but that seems less react-y
                this.setState({
                    isVisible: this.isVisible()
                });
            });
        },
        componentDidMount() {
            // since the listener calls .setState(), it must occur after .getInitialState() has completed
            this.setupSizeListener();
        },
        shouldComponentUpdate(nextProps, nextState) {
            // only update the component
            // IF there is no state yet
            // OR IF the isVisible state has changed
            return !this.state || nextState.isVisible !== this.state.isVisible;
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

StickyHeader._inject = ['EventRegistrar', 'WatchCSSMedia'];

export default StickyHeader;
