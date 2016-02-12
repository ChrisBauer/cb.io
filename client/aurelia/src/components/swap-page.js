import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import CONSTANTS from '../Constants';
import Utils from '../../../shared/src/js/utils';

@inject(HttpClient)
export class SwapPage {
	constructor(http) {
		this.http = http.configure(config => {
			config.withBaseUrl('http://localhost:9000');
		});
        this.frontEnds = [];
	}

	bind() {
		this.http.fetch('/rethink/frontEnds')
			.then(response => response.json())
			.then(response => Utils.processFrontEnds(response.frontEnds, CONSTANTS.APP_NAME))
			.then(frontEnds => {
                this.frontEnds = frontEnds;
            });
	}
}	
