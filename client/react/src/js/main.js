var injectorConfig = require('./injector-config').init();

var React = require('react');
var ReactDOM = require('react-dom');
var injector = require('js-di').Injector;
var Header = injector.invoke(require('./components/header'));
var Section = injector.invoke(require('./components/section'));
var CONSTANTS = require('./Constants');


ReactDOM.render(
	<div>
		<Header />
	</div>,
	document.getElementById('header')
);

ReactDOM.render(
	<div>
		<Section title="About" contentUrl={CONSTANTS.ABOUT_URL} />
		<Section title="Resume" contentUrl={CONSTANTS.RESUME_URL} />
	</div>,
	document.getElementById('main')
);
