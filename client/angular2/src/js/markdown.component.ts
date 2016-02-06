import {Component, Pipe, PipeTransform} from 'angular2/core';
import * as marked from  'marked/marked.min';

@Pipe({
    name: 'markdown'
})
class MarkdownPipe implements PipeTransform {
    transform (value) {
        return marked.parse(value);
    }
}

@Component({
	selector: 'markdown',
	inputs: ['mdSrc'],
    pipes: [MarkdownPipe],
	template: '<p [innerHTML]="mdSrc | markdown"><p>'
	//template: '<p>{{mdSrc}}</p>'
})
export class MarkdownComponent {
	public mdSrc: string;
}
