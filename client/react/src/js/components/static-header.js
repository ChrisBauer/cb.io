var React = require('react');
var injector = require('../injector');
var SwapPage = injector.invoke(require('./swap-page'));
var ProgressTracker = injector.invoke(require('./progress-tracker'));

module.exports = function () {
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
