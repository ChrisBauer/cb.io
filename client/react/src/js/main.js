var React = require('react');
var ReactDOM = require('react-dom');

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

var SwapPage = React.createClass({
	render: function () {
		return (
			<div className="swap-page">Swap Page</div>
		);
	}
});

ReactDOM.render(
	<Header />,
	document.getElementById('main')
);
