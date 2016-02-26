import {Component, OnInit} from 'angular2/core';
import {ScrollKeeper} from './scroll-keeper.service';
import {Anchor} from './objects/anchor.class';

@Component({
    selector: 'progress-tracker',
    template: `
        <div class="option" *ngFor="#anchor of anchors" [ngClass]="{selected: anchor.selected}">
            <a [href]="anchor.location" [title]="anchor.title">
                {{anchor.title}}
            </a>
        </div>
    `
})
export class ProgressTrackerComponent implements OnInit {
    public anchors : Anchor [];
    
    constructor (private ScrollKeeper: ScrollKeeper) {
        this.anchors = ScrollKeeper.anchors;
    }
    
    ngOnInit () {
    }
}