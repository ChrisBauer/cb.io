import {bindable} from 'aurelia-framework';
import marked from 'marked';

@bindable('md')
export class Markdown {
    
    constructor () {
    }
    
    bind() {
        this.md = marked(this.md);
    }
    
}
