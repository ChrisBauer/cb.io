import {bindable, inject} from 'aurelia-framework';
import {WatchCSSMedia} from 'watch-css-media';
import EventRegistrar from 'event-registrar';
import {StyleConstants} from '../Constants';

const HEADER_TAG = 'header-wrapper';

@bindable('frontEnds')
@inject(EventRegistrar, WatchCSSMedia)
export class StickyHeader {
    constructor (EventRegistrar, WatchCSSMedia) {
		this.EventRegistrar = EventRegistrar;
        this.WatchCSSMedia = WatchCSSMedia;
        this.isVisible = false;
        this.headerOffset = StyleConstants.FULL_HEADER_OFFSET;
    }
    
    attached () {
		this.EventRegistrar.register(window, 'onscroll', () => {
			this.isVisible = this.checkVisible(this.headerOffset);
		});

        this.WatchCSSMedia.onWidthGreaterThan(StyleConstants.WIDTH_BREAKPOINT,
            (event) => {
                this.headerOffset = event.matches ?
                    StyleConstants.FULL_HEADER_OFFSET : StyleConstants.SMALL_HEADER_OFFSET;
                this.isVisible = this.checkVisible();
            }
        );
    }

    checkVisible () {
        return (document.documentElement.scrollTop || document.body.scrollTop) > this.headerOffset;
    }
}
