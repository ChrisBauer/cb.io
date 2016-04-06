import {Component} from 'angular2/core';
import {FrontEnd} from './objects/frontEnd.interface';
import EventRegistrar from 'event-registrar';

@Component({
	selector: 'swap-page',
    inputs: ['frontEnds'],
	template: `
        <div [ngClass]="{'swap-page': true, active: active}" (mouseenter)="activate()" (mouseleave)="deactivate()">
            <div class="option" *ngFor="#frontEnd of frontEnds">
                <a (click)="handleClick(frontEnd.location)" [title]="frontEnd.title">{{frontEnd.title}}</a>
            </div>
        </div>
	`
})
export class SwapPageComponent {
	public frontEnds: FrontEnd[];
    public active : boolean = false;

    constructor (public EventRegistrar : EventRegistrar, public window : Window) {
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
            this.window.location.href = location;
        }
    }
}
