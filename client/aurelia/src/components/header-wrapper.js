import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {ScrollKeeper} from './scroll-keeper';
import CONSTANTS from '../Constants';
import Utils from 'shared/utils';

@inject(HttpClient, ScrollKeeper)
export class HeaderWrapper {
    
    constructor(http, ScrollKeeper) {
		this.http = http.configure(config => {
			config.withBaseUrl(CONSTANTS.RETHINK_BASE_URL);
		});
        this.frontEnds = [];
		this.anchors = ScrollKeeper.anchors;
	}

	bind() {
		this.http.fetch('/frontEnds')
			.then(response => response.json())
			.then(response => Utils.processFrontEnds(response.frontEnds, CONSTANTS.APP_NAME))
			.then(frontEnds => {
                this.frontEnds = frontEnds;
            });
	}
    
}
