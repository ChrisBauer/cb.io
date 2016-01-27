var React = require('react');

var Header = React.createClass({
	displayName: "Header",

	render: function () {
		return React.createElement(
			"header",
			null,
			React.createElement(
				"div",
				{ "class": "title" },
				"Chris Bauer"
			),
			React.createElement(SwapPage, null)
		);
	}
});

var SwapPage = React.createClass({
	displayName: "SwapPage",

	render: function () {
		return React.createElement(
			"div",
			{ className: "swap-page" },
			"Swap Page"
		);
	}
});

module.exports = {
	Header: Header,
	SwapPage: SwapPage
};