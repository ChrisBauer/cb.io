import init from './injector-config';

import React from 'react';
import ReactDOM from 'react-dom';
import {Injector} from 'js-di';
import headerC from './components/header';
import sectionC from './components/section';
import {UrlConstants} from './Constants';


const Header = Injector.invoke(headerC);
const Section = Injector.invoke(sectionC);


ReactDOM.render(
	<div>
		<Header />
	</div>,
	document.getElementById('header')
);

ReactDOM.render(
	<div>
		<Section title="About" contentUrl={UrlConstants.ABOUT_URL} />
		<Section title="Resume" contentUrl={UrlConstants.RESUME_URL} />
	</div>,
	document.getElementById('main')
);
