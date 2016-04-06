import {bindable, inject} from 'aurelia-framework';
import EventRegistrar from 'event-registrar';

@bindable('frontEnds')
@inject(EventRegistrar)
export class SwapPage {
	constructor (EventRegistrar) {
        EventRegistrar.register(window, 'onscroll', () => this.deactivate() );
        this.EventRegistrar = EventRegistrar;
        this.active = false;    
    }

    activate () {
        setTimeout( () => this.active = true );
    }

    deactivate () {
        this.active = false;
    }

    handleClick (location) {
        if (this.active) {
            window.location.href = location;
        }
    }
}	
