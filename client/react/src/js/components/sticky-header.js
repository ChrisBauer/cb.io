const React = require('react');
const injector = require('js-di').Injector;
const SwapPage = injector.invoke(require('./swap-page'));
const ProgressTracker = injector.invoke(require('./progress-tracker'));
const classNames = require('classnames');

const HEADER_CLASS = 'header-wrapper';

function StickyHeader (EventRegistrar) {
    let headerElement = null;

    return React.createClass({
        displayName: 'StickyHeader',
        getInitialState: function getInitialState () {
            this.setupScrollHandler();
            return {
                isVisible: this.isVisible()
            };
        },
        componentDidMount: function () {
            headerElement = document.getElementsByClassName(HEADER_CLASS)[0];
        },
        isVisible: function isVisible (headerHeight) {
            return (document.documentElement.scrollTop || document.body.scrollTop) > headerHeight;
        },
        setupScrollHandler: function setupScrollHandler () {
            EventRegistrar.register(window, 'onscroll', () => {
                let headerHeight = this.getHeaderHeight();
                if (this.isVisible(headerHeight) !== this.state.isVisible) {
                    this.setState({isVisible: !this.state.isVisible});
                }
            });
        },
        getHeaderHeight: function () {
            return headerElement.offsetHeight - 60;
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

StickyHeader._inject = ['EventRegistrar'];

module.exports = StickyHeader;
