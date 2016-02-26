import {bindable, inject} from 'aurelia-framework';
import {ScrollKeeper} from './scroll-keeper';


@bindable('anchorId')
@bindable('anchorTitle')
@inject(ScrollKeeper, Element)
export class Anchor {
	constructor (ScrollKeeper, Element) {
		this.ScrollKeeper = ScrollKeeper;
        this.element = Element;
	}

	attached () {
		this.ScrollKeeper.registerAnchor(this.buildAnchor());
	}

    buildAnchor () {
        return (function Anchor (anchor) {
            return {
                id: anchor.anchorId,
                title: anchor.anchorTitle,
                location: '#' + anchor.anchorId,
                element: anchor.element,
                getOffset: () => anchor.element.offsetTop - 1
            };
        })(this);
    } 
}
