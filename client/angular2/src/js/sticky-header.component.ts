import {Component, OnInit, NgZone} from 'angular2/core';
import {FrontEnd} from './frontEnd.interface';
import {SwapPageComponent} from './swap-page.component';

const HEADER_HEIGHT : number = 240;
@Component({
	selector: 'sticky-header',
	inputs: ['frontEnds'],
    directives: [SwapPageComponent],
	template: `
		<header [ngClass]="{sticky: true, visible: isVisible}">
			<div class="title">Chris Bauer</div>
			<swap-page [frontEnds]="frontEnds" class="swap-page"></swap-page>
		</header>
	`
})
export class StickyHeaderComponent implements OnInit {
	public frontEnds : FrontEnd[];
	public isVisible: boolean = false;
	public zone: NgZone;
    
	constructor(zone: NgZone) {
		this.zone = zone;
	}

	ngOnInit () {
        window.onscroll = () => {
			this.zone.run(() => {
				this.isVisible = this.checkVisible();
			});
		};
	}

    checkVisible () : boolean {
        return (document.documentElement.scrollTop || document.body.scrollTop) > HEADER_HEIGHT;
    }
	
}
