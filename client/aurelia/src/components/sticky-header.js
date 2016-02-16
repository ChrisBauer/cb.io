import {bindable} from 'aurelia-framework';

const HEADER_HEIGHT = 240;

@bindable('frontEnds')
export class StickyHeader {
    constructor () {
        this.isVisible = false;
    }
    
    attached () {
        window.onscroll = () => {
			this.isVisible = this.checkVisible();
		};
    }
    
    checkVisible () {
        return (document.documentElement.scrollTop || document.body.scrollTop) > HEADER_HEIGHT;
    }
}