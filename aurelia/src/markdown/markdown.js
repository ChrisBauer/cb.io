import {bindable, inject} from 'aurelia-framework';
import $ from 'jquery';
import MDParser from 'markdown/markdown-parser';

@bindable('md')
@inject(Element)
export class Markdown {
    
    constructor (element) {
        this.el = element;
        this.MDParser = new MDParser();
    }
    
    bind() {
        this.md = this.MDParser.parse(this.md);
    }
    
}
