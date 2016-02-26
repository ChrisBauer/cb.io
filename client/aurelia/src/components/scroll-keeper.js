import {inject} from 'aurelia-framework';
import EventRegistrar from 'shared/event-registrar';

@inject(EventRegistrar)
export class ScrollKeeper {
	constructor (EventRegistrar) {
		this.EventRegistrar = EventRegistrar;
		this.anchors = [];
		this.callbacks = [];
		this.setupWatcher();
		this.observer = new MutationObserver(() => {
			this.updateOffsets();
		});
	}

	setupWatcher () {
		this.EventRegistrar.register(window, 'onscroll',  () => {
			this.checkContentSection()
		});
	}

	checkContentSection () {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		let i = 0;

		// Loop until the scrollTop is less than one of the anchor's positions. At this point,
		// we'll want to take the previous anchor
		while (i < this.anchors.length && scrollTop > this.anchors[i].position && ++i);
		
		// make sure we don't have a negative value for i after decrementing
		i = --i < 0 ? 0 : i;

		if (this.anchors[i] !== this.currentAnchor) {
            if (this.currentAnchor) {
                this.currentAnchor.selected = false;
            }
            this.anchors[i].selected = true;
			this.currentAnchor = this.anchors[i];
			this.notify(this.currentAnchor);
		}
	}

	updateOffsets () {
		this.anchors.forEach( anchor => anchor.updateOffset() );
	}

	notify (currentAnchor) {
		this.callbacks.forEach( cb => cb(currentAnchor) );
	}

	registerChangeHandler (cb) {
		this.callbacks.push(cb);
	}

	registerAnchor (anchor) {
		this.observer.observe(anchor.element.parentElement, {childList: true, subtree: true});

		this.anchors.push(anchor);
        this.anchors.sort( (a, b) => a.position > b.position ? 1 : a.position === b.position ? 0 : -1 );

        this.anchors.forEach ( (anchor, i) => anchor.selected = i === 0 );
	}
}
