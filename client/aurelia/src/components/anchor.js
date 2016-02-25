import {bindable, inject} from 'aurelia-framework';
import {ScrollKeeper} from './scroll-keeper';


@bindable('anchorId')
@bindable('anchorTitle')
@inject(ScrollKeeper)
export class Anchor {
	constructor (ScrollKeeper) {
		this.ScrollKeeper = ScrollKeeper;
	}

	attached () {
		this.ScrollKeeper.registerAnchor(this.anchorId, this.anchorTitle, '#' + this.anchorId);
	}
}
