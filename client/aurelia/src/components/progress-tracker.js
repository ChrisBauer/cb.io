import {inject} from 'aurelia-framework';
import {ScrollKeeper} from './scroll-keeper';
import EventRegistrar from 'event-registrar';

@inject(ScrollKeeper, EventRegistrar)
export class ProgressTracker {

	constructor (ScrollKeeper, EventRegistrar) {
        EventRegistrar.register(window, 'onscroll', () => this.deactivate() );
        this.EventRegistrar = EventRegistrar;
		this.anchors = ScrollKeeper.anchors;
	}

    activate () {
        setTimeout( () => this.active = true );
    }
    
    deactivate () {
        this.active = false;
    }

    handleClick (location) {
        if (this.active) {
            window.location.hash = '';
            window.location.hash = location;
            this.deactivate();
        }
    }
}
