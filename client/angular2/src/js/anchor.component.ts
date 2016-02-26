import {Component, OnInit, ElementRef} from 'angular2/core';
import {ScrollKeeper} from './scroll-keeper.service';
import {Anchor} from './objects/anchor.class';

@Component({
    selector: 'anchor',
    inputs: ['anchorId', 'anchorTitle'],
    template: '<a class="anchor" [id]="anchorId" [title]="anchorTitle"></a>'
})
export class AnchorComponent implements OnInit {
    public anchorId : string;
    public anchorTitle : string;
    
    constructor (private ScrollKeeper : ScrollKeeper, private element : ElementRef) {
        
    }
    
    ngOnInit () {
        let anchor = new Anchor (
            this.anchorId,
            this.anchorTitle,
            '#' + this.anchorId,
            this.element.nativeElement
        );
        
        this.ScrollKeeper.registerAnchor(anchor);
    }
}