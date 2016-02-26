var React = require('react');
var SwapPage = require('./swap-page');
var ProgressTracker = require('./progress-tracker');

module.exports = React.createClass({
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
