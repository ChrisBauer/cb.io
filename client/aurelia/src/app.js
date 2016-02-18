import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class App {
    constructor(http) {
        this.http = http.configure(config => {
            config.withBaseUrl('http://chrisbauer.io:9000');
        });
    }

    activate() {
        this.http.fetch('/rethink/about')
            .then(response => response.json())
            .then(about => {
                this.aboutMD = about.content;
            });
            
        this.http.fetch('/rethink/resume')
            .then(response => response.json())
            .then(resume => {
                this.resumeMD = resume.content;
            });
    }
	attached () {
		// cleanup the "fake" header once the real document has loaded
		var outsideHeader = document.getElementById('outside-header');
		outsideHeader.parentNode.removeChild(outsideHeader);
	}
}
