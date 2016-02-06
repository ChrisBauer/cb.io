import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Response} from 'angular2/http';
import {CONSTANTS} from './Constants';
import {MarkdownComponent} from './markdown.component'
import 'rxjs/Rx';

@Component({
	selector: 'angular-app',
	providers: [HTTP_PROVIDERS],
	directives: [MarkdownComponent],
	template: `
        <div>
            <header>
				<div class="title">Chris Bauer</div>
				<div class="swap-page">Swap Page</div>
			</header>
			<div>
				<section class="about">
					<h3>About</h3>
					<markdown [mdSrc]="aboutMD"></markdown>
				</section>
				<section class="resume">
					<h3>Resume</h3>
					<markdown [mdSrc]="resumeMD"></markdown>
					<!-- <p>{{md}}</p> -->
				</section>
				<section class="freelance">
					<h3>Freelance</h3>
					<p>
						At vero eos et ...
					</p>
			</section>
		</div>
    `
})
export class AppComponent implements OnInit {
    public aboutMD: string = '';
    public resumeMD : string = '';

	constructor(private http: Http) {
	
	}

	ngOnInit () {
		this.http.get(CONSTANTS.RETHINK_BASE_URL + 'about')
			.map(res => res.json())
			.subscribe(res => {
				this.aboutMD = res.content;
			});
            
        this.http.get(CONSTANTS.RETHINK_BASE_URL + 'resume')
			.map(res => res.json())
			.subscribe(res => {
				this.resumeMD = res.content;
			});
		
	}
}
