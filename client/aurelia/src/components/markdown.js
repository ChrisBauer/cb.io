import {inject, bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import marked from 'marked';
import {UrlConstants} from '../Constants';

@bindable('srcUrl')
@inject(HttpClient)
export class Markdown {

    constructor (http) {
		this.http = http.configure(config => {
			config.withBaseUrl(UrlConstants.RETHINK_BASE_URL);
		});
    }

    bind() {
		this.http.fetch(this.srcUrl)
			.then(response => response.json())
			.then(response => marked.parse(response.content))
			.then(content => this.md = content);
    }

}
