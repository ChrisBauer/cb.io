import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class App {
    constructor(http) {
        this.http = http.configure(config => {
            config.withBaseUrl('http://localhost:3000');
        });
    }

    activate() {
        this.http.fetch('/rethink/resume')
            .then(response => response.json())
            .then(resume => {
                this.resume = resume.content;
            });
    }
}
