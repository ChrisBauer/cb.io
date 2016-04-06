import {Injectable} from 'angular2/core';
import EventRegistrar from 'event-registrar';
import {Anchor} from './objects/anchor.class';

@Injectable()
export class ScrollKeeper {
    public anchors : Anchor [] = [];
    public currentAnchor : Anchor = null;
    public observer : MutationObserver;
    
    constructor (private EventRegistrar : EventRegistrar) {
        this.setupWatcher();
        this.observer = new MutationObserver( () => {
            this.updateOffsets();
        })
    }
    
    setupWatcher () : void {
        this.EventRegistrar.register(window, 'onscroll', () => {
            this.checkContentSection();
        })
    }
    
    checkContentSection () : void {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let i = 0;
        
        while (i < this.anchors.length && scrollTop > this.anchors[i].position && ++i);
        i = --i < 0 ? 0 : i;
        
        if (this.anchors[i] !== this.currentAnchor) {
            if (this.currentAnchor) {
                this.currentAnchor.selected = false;
            }
            this.anchors[i].selected = true;
            this.currentAnchor = this.anchors[i];
        }
    }
    
    updateOffsets () : void {
        this.anchors.forEach( anchor => anchor.updateOffset());
    }
    
    registerAnchor (anchor : Anchor) : void {
        this.observer.observe(anchor.element.parentElement, {childList: true, subtree: true});
        this.anchors.push(anchor);
        
        this.anchors.sort( (a, b) => a.position > b.position ? 1 : a.position === b.position ? 0 : -1);
        this.anchors.forEach( (anchor, i) => anchor.selected = i === 0);
    }
}