import init from './injector-config';

import React from 'react';
import ReactDOM from 'react-dom';
import {Injector} from 'js-di';
import headerC from './components/header';
import bodyC from './components/body';


const Header = Injector.invoke(headerC);
const Body = Injector.invoke(bodyC);


ReactDOM.render(
	<div>
		<Header />
	</div>,
	document.getElementById('header')
);

ReactDOM.render(
	<div>
		<Body />
	</div>,
	document.getElementById('main')
);
