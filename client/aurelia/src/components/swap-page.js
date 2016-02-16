import {HttpClient} from 'aurelia-fetch-client';
import {bindable} from 'aurelia-framework';
import CONSTANTS from '../Constants';
import Utils from '../../../shared/src/js/utils';

@bindable('frontEnds')
export class SwapPage {
	constructor () {
        
    }
    
    bind() {
        console.log(this.frontEnds);
    }
}	
