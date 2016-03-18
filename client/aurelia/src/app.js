import {inject} from 'aurelia-framework';
import {UrlConstants} from './Constants';

export class App {
    constructor() {
		this.aboutUrl = UrlConstants.ABOUT_URL;
		this.resumeUrl = UrlConstants.RESUME_URL;
    }

	attached () {
		// cleanup the "fake" header once the real document has loaded
		var outsideHeader = document.getElementById('outside-header');
		outsideHeader.parentNode.removeChild(outsideHeader);
	}
}
