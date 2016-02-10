var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./components/header');
var Section = require('./components/section');

const ABOUT_URL = 'http://localhost:9000/rethink/about';
const RESUME_URL = 'http://localhost:9000/rethink/resume';

var frontEnds = { 
	react: { title: 'React', location: '/react' },
	aurelia: { title: 'Aurelia', location: '/aurelia' },
	angular2: { title: 'Angular 2', location: '/angular2' }
};
	
ReactDOM.render(
	<div>
		<Header options={frontEnds} />
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
