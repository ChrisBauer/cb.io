import {Component} from 'angular2/core';
import {Http} from 'angular2/http';
import {FrontEnd} from './frontEnd.interface';

@Component({
	selector: 'swap-page',
    inputs: ['frontEnds'],
	template: `
		<div class="option" *ngFor="#frontEnd of frontEnds">
			<a [href]="frontEnd.location" [title]="frontEnd.title">{{frontEnd.title}}</a>
		</div>
	`
})
export class SwapPageComponent {
	public frontEnds: FrontEnd[];

	constructor(private http: Http) {
	
	}
}
