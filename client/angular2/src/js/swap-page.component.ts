import {Component, OnInit} from 'angular2/core';
import {Http} from 'angular2/http';
import {CONSTANTS} from './Constants';
import Utils from './shared/utils';

interface FrontEnd {
	title: string;
	location: string;
}

@Component({
	selector: 'swap-page',
	template: `
		<div class="option" *ngFor="#frontEnd of frontEnds">
			<a [href]="frontEnd.location" [title]="frontEnd.title">{{frontEnd.title}}</a>
		</div>
	`
})
export class SwapPageComponent implements OnInit {
	public frontEnds: FrontEnd[];

	constructor(private http: Http) {
	
	}

	ngOnInit () {
		this.http.get(CONSTANTS.RETHINK_BASE_URL + 'frontEnds')
			.map(res => res.json())
			.subscribe(res => {
				this.frontEnds = Utils.processFrontEnds(res.frontEnds, CONSTANTS.APP_NAME);
			});
	}
}
