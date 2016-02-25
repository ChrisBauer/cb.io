import {inject} from 'aurelia-framework';

export class App {
    constructor() {
		this.aboutUrl = '/about';
		this.resumeUrl = '/resume';
    }

	attached () {
		// cleanup the "fake" header once the real document has loaded
		var outsideHeader = document.getElementById('outside-header');
		outsideHeader.parentNode.removeChild(outsideHeader);
	}
}
