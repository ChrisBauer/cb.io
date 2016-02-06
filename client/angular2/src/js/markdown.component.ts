import {Component, OnInit} from 'angular2/core';

declare var marked: any;

@Component({
	selector: 'markdown',
	inputs: ['mdSrc'],
	template: '<p [innerHTML]="parsedMD"><p>';
	//template: '<div [innerHTML]="parsedMD"></div>'
})
export class MarkdownComponent implements OnInit {
	public mdSrc: string;
	public parsedMD: string;

	// parsedMD = marked(mdSrc);
	ngOnInit () {
		this.parsedMD = marked(this.mdSrc);
	}
}
