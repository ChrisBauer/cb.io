import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {ScrollKeeper} from './scroll-keeper';
import {AppConstants, UrlConstants} from '../Constants';
import Utils from 'shared/utils';

@inject(HttpClient, ScrollKeeper)
export class HeaderWrapper {
    
    constructor(http, ScrollKeeper) {
		this.http = http.configure(config => {
			config.withBaseUrl(UrlConstants.RETHINK_BASE_URL);
		});
        this.frontEnds = [];
		this.anchors = ScrollKeeper.anchors;
	}

	bind() {
		this.http.fetch(UrlConstants.FRONT_ENDS_URL)
			.then(response => response.json())
			.then(response => Utils.processFrontEnds(response.frontEnds, AppConstants.APP_NAME))
			.then(frontEnds => {
                this.frontEnds = frontEnds;
            });
	}
    
}
