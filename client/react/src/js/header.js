var React = require('react');

var Header = React.createClass({
	render: function () {
		return (
			<header>
				<div class="title">Chris Bauer</div>
				<SwapPage />
			</header>
		);
	}
});

var SwapPage = React.createClass({
	render: function () {
		return (
			<div className="swap-page">Swap Page</div>
		);
	}
});

module.exports = {
	Header: Header,
	SwapPage: SwapPage
};
