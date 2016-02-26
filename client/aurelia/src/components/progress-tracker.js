import {inject} from 'aurelia-framework';
import {ScrollKeeper} from './scroll-keeper';

@inject(ScrollKeeper)
export class ProgressTracker {

	constructor (ScrollKeeper) {
		this.anchors = ScrollKeeper.anchors;
	}

}
