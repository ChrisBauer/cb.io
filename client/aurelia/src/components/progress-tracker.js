import {inject} from 'aurelia-framework';
import {ScrollKeeper} from './scroll-keeper';

@inject(ScrollKeeper)
export class ProgressTracker {

	constructor (ScrollKeeper) {
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
