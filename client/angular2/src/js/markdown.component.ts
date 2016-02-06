import {Component, OnInit} from 'angular2/core';
import * as marked from  'marked/marked.min';

@Component({
	selector: 'markdown',
	inputs: ['mdSrc'],
	template: '<p [innerHTML]="parse(mdSrc)"><p>'
	//template: '<p>{{mdSrc}}</p>'
})
export class MarkdownComponent implements OnInit {
	public mdSrc: string;
	public parsedMD: string;

	// parsedMD = marked(mdSrc);
	//ngOnInit () {
	parse (mdSrc : string) {
		return marked.parse(mdSrc);
	}
}
