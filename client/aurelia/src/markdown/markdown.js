import {bindable, inject} from 'aurelia-framework';
import $ from 'jquery';
import marked from 'marked';

@bindable('md')
export class Markdown {
    
    constructor () {
    }
    
    bind() {
        this.md = marked(this.md);
    }
    
}
