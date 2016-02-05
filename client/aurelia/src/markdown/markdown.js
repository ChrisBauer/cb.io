import {bindable, inject} from 'aurelia-framework';
import $ from 'jquery';
import MDParser from 'markdown/markdown-parser';
import marked from 'marked';

@bindable('md')
export class Markdown {
    
    constructor () {
    }
    
    bind() {
        this.md = marked(this.md);
    }
    
}
