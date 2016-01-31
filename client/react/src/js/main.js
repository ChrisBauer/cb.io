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

var Section = React.createClass({
	render: function () {
		return (
			<section>
				<h3>{this.props.title}</h3>
				<p>{this.props.content}</p>
			</section>
		);
	}
});

ReactDOM.render(
	<div>
		<Header />
	</div>,
	document.getElementById('header')
);

ReactDOM.render(
	<div>
		<Section title="About" content="Lorem Ipsum" />
		<Section title="Resume" content="Resume" />
	</div>,
	document.getElementById('main')
);
