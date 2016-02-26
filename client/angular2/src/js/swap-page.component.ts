import {Component} from 'angular2/core';
import {FrontEnd} from './objects/frontEnd.interface';

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
}
