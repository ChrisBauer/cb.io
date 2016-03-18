/// <reference path="../../typings/watch-css-media/WatchCSSMedia.d.ts" />

import {Component, OnInit, NgZone} from 'angular2/core';
import {FrontEnd} from './objects/frontEnd.interface';
import {ProgressTrackerComponent} from './progress-tracker.component';
import {SwapPageComponent} from './swap-page.component';
import {StyleConstants} from './Constants';
import EventRegistrar from './shared/event-registrar';
import {WatchCSSMedia} from 'watch-css-media';

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
    public headerOffset : number = StyleConstants.FULL_HEADER_OFFSET;
    public WatchCSSMedia: any;
    
	constructor(
        private zone: NgZone,
        private EventRegistrar: EventRegistrar
    ) {
		this.WatchCSSMedia = WatchCSSMedia();
    
    }

	ngOnInit () {
        this.EventRegistrar.register(window, 'onscroll', () => {
			this.zone.run(() => {
				this.isVisible = this.checkVisible();
			});
		});

        this.WatchCSSMedia.onWidthGreaterThan(StyleConstants.WIDTH_BREAKPOINT,
            (event) => {
				this.zone.run(() => {
					this.headerOffset = event.matches ? StyleConstants.FULL_HEADER_OFFSET : StyleConstants.SMALL_HEADER_OFFSET;
					this.isVisible = this.checkVisible();
				});
            }
        );
	}

    checkVisible () : boolean {
        return (document.documentElement.scrollTop || document.body.scrollTop) > this.headerOffset;
    }
	
}
