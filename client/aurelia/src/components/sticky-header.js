import {bindable, inject} from 'aurelia-framework';
import {EventRegistrar} from '../utils/event-registrar';

const HEADER_HEIGHT = 240;

@bindable('frontEnds')
@bindable('anchors')
@inject(EventRegistrar)
export class StickyHeader {
    constructor (EventRegistrar) {
		this.EventRegistrar = EventRegistrar;
        this.isVisible = false;
    }
    
    attached () {
		this.EventRegistrar.register(window, 'onscroll', () => {
			this.isVisible = this.checkVisible();
		});
    }
    
    checkVisible () {
        return (document.documentElement.scrollTop || document.body.scrollTop) > HEADER_HEIGHT;
    }
}
