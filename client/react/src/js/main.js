var React = require('react');
var ReactDOM = require('react-dom');
var headerModule = require('./header');
var Section = require('./section');

ReactDOM.render(
	<div>
		<headerModule.Header />
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
