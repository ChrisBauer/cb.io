var React = require('react');
var SwapPage = require('./swap-page');

module.exports = React.createClass({
	render: function () {
		return (
			<header>
				<div className="title">Chris Bauer</div>
				<SwapPage options={this.props.options} />
			</header>
		);
	}
});
