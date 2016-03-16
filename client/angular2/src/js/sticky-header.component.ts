import {Component, OnInit, NgZone} from 'angular2/core';
import {FrontEnd} from './objects/frontEnd.interface';
import {ProgressTrackerComponent} from './progress-tracker.component';
import {SwapPageComponent} from './swap-page.component';
import EventRegistrar from './shared/event-registrar';

const HEADER_CLASS : string = 'static-header';
@Component({
	selector: 'sticky-header',
	inputs: ['frontEnds'],
    directives: [SwapPageComponent, ProgressTrackerComponent],
	template: `
		<header [ngClass]="{sticky: true, visible: isVisible}">
			<div class="title">Chris Bauer</div>
            <progress-tracker class="progress-tracker"></progress-tracker>
			<swap-page [frontEnds]="frontEnds" class="swap-page"></swap-page>
		</header>
	`
})
export class StickyHeaderComponent implements OnInit {
	public frontEnds : FrontEnd[];
	public isVisible : boolean = false;
    
	constructor(private zone: NgZone, private EventRegistrar: EventRegistrar) {
	}

	ngOnInit () {
        let headerElement : Element = document.getElementsByClassName(HEADER_CLASS)[0];
        this.EventRegistrar.register(window, 'onscroll', () => {
			this.zone.run(() => {
                let headerHeight = this.getHeaderHeight(headerElement);
				this.isVisible = this.checkVisible(headerHeight);
			});
		});
	}

    getHeaderHeight (headerElement) : number {
        return headerElement.offsetHeight - 60;
    }

    checkVisible (headerHeight) : boolean {
        return (document.documentElement.scrollTop || document.body.scrollTop) > headerHeight;
    }
	
}
