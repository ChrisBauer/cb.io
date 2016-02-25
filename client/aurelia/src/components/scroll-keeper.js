import {inject} from 'aurelia-framework';
import {EventRegistrar} from '../utils/event-registrar';

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
			this.currentAnchor = this.anchors[i];
			this.notify(this.currentAnchor);
		}
	}

	getOffset (element) {
		return element.offsetTop;
	}

	updateOffsets () {
		this.anchors.forEach( anchor => anchor.position = this.getOffset(anchor.element) );
	}

	notify (currentAnchor) {
		console.log(currentAnchor);
		this.callbacks.forEach( cb => cb(currentAnchor) );
	}

	registerChangeHandler (cb) {
		this.callbacks.push(cb);
	}

	registerAnchor (id, title, href) {
		let anchor = {
			id: id,
			title: title,
			location: href,
			element: document.getElementById(id)
		};
		anchor.position = this.getOffset(anchor.element);

		this.observer.observe(anchor.element.parentElement.parentElement, {childList: true, subtree: true});

		this.anchors.push(anchor);
	}
}
