import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {AppComponent} from './app.component';
import {enableProdMode} from 'angular2/core';

enableProdMode();
bootstrap(AppComponent, [provide(Window, {useValue: window})]);
