import {Component} from 'angular2/core';
import {ScrollKeeper} from './scroll-keeper.service';
import {Anchor} from './objects/anchor.class';
import EventRegistrar from 'event-registrar';

@Component({
    selector: 'progress-tracker',
    template: `
        <div [ngClass]="{'progress-tracker': true, active: active}" (mouseenter)="activate()" (mouseleave)="deactivate()">
            <div class="option" *ngFor="#anchor of anchors" [ngClass]="{selected: anchor.selected}">
                <a (click)="handleClick(anchor.location)" [title]="anchor.title">
                    {{anchor.title}}
                </a>
            </div>
        </div>
    `
})
export class ProgressTrackerComponent {
    public anchors : Anchor [];
    public active : boolean = false;
    
    constructor (private ScrollKeeper: ScrollKeeper, public EventRegistrar : EventRegistrar, public window : Window) {
        this.anchors = ScrollKeeper.anchors;
        this.EventRegistrar.register(window, 'onscroll', () => this.deactivate() );
    }

    activate () {
        setTimeout( () => this.active = true );
    }

    deactivate () {
        this.active = false;
    }

    handleClick (location) {
        if (this.active) {
            this.window.location.hash = '';
            this.window.location.hash = location;
            this.deactivate();
        }
    }
}
