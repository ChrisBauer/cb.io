import {bindable, inject} from 'aurelia-framework';
import EventRegistrar from 'shared/event-registrar';

const HEADER_TAG = 'header-wrapper';

@bindable('frontEnds')
@inject(EventRegistrar)
export class StickyHeader {
    constructor (EventRegistrar) {
		this.EventRegistrar = EventRegistrar;
        this.isVisible = false;
    }
    
    attached () {
        this.headerElement = this.getHeaderElement();
		this.EventRegistrar.register(window, 'onscroll', () => {
			this.isVisible = this.checkVisible(this.getHeaderHeight());
		});
    }

    getHeaderElement () {
        return document.getElementsByTagName(HEADER_TAG)[0].children[0];
    }
    
    getHeaderHeight () {
        return this.headerElement.offsetHeight - 60;
    }
    
    checkVisible (headerHeight) {
        return (document.documentElement.scrollTop || document.body.scrollTop) > headerHeight;
    }
}
