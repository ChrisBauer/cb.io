var React = require('react');
var SwapPage = require('./swap-page');

var Header = React.createClass({
	render: function () {
		return (
			<header>
				<div className="title">Chris Bauer</div>
				<SwapPage />
			</header>
		);
	}
});

module.exports = {
	Header: Header,
	SwapPage: SwapPage
};
