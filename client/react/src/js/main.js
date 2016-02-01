var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./components/header');
var Section = require('./components/section');

const ABOUT_URL = 'http://localhost:9000/rethink/about';
const RESUME_URL = 'http://localhost:9000/rethink/resume';

ReactDOM.render(
	<div>
		<Header />
	</div>,
	document.getElementById('header')
);

ReactDOM.render(
	<div>
		<Section title="About" contentUrl={ABOUT_URL} />
		<Section title="Resume" contentUrl={RESUME_URL} />
	</div>,
	document.getElementById('main')
);
