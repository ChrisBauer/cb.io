import {Component, OnInit} from 'angular2/core';
//import {Http} from 'angular2/http';
import {CONSTANTS} from './Constants';
import {MarkdownComponent} from './markdown.component'

@Component({
	selector: 'angular-app',
	//providers: [Http],
	directives: [MarkdownComponent],
	template: `
        <div>
            <header>
				<div class="title">Chris Bauer</div>
				<div class="swap-page">Swap Page</div>
			</header>
			<section>
				<h3>About</h3>
				<p>
					Lorem ipsum...
				</p>
			</section>
			<section>
				<h3>Resume</h3>
				<markdown [mdSrc]="md"></markdown>
				<!-- <p>{{md}}</p> -->
			</section>
			<section>
				<h3>Freelance</h3>
				<p>
					At vero eos et ...
				</p>
			</section>
    `
})
export class AppComponent implements OnInit {
    public md: string = '';

//	constructor(http: Http) {
//
//	}

	ngOnInit () {
		this.md = '### Test';
		/*
		this.http.get(CONSTANTS.RETHINK_BASE_URL)
			.map(res => res.json())
			.subscribe(md => this.md = md);
		*/
	}
}
