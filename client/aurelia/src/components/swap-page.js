import {bindable} from 'aurelia-framework';

@bindable('frontEnds')
export class SwapPage {
	constructor () {
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
