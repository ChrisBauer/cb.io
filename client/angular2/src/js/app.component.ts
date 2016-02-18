import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Response} from 'angular2/http';
import {CONSTANTS} from './Constants';
import {FrontEnd} from './frontEnd.interface';

import {MarkdownComponent} from './markdown.component';
import {SwapPageComponent} from './swap-page.component';
import {StickyHeaderComponent} from './sticky-header.component';

import Utils from './shared/utils';
import 'rxjs/Rx';

@Component({
	selector: 'angular-app',
	providers: [HTTP_PROVIDERS],
	directives: [MarkdownComponent, SwapPageComponent, StickyHeaderComponent],
	template: `
        <div>
            <header>
				<div class="title">Chris Bauer</div>
				<swap-page [frontEnds]="frontEnds" class="swap-page"></swap-page>
			</header>
            <sticky-header [frontEnds]="frontEnds"></sticky-header>
			<div>
				<section class="about">
					<a id="about"></a>
					<h3>About</h3>
					<markdown [mdSrc]="aboutMD"></markdown>
				</section>
				<section class="resume">
					<a id="resume"></a>
					<h3>Resume</h3>
					<markdown [mdSrc]="resumeMD"></markdown>
					<!-- <p>{{md}}</p> -->
				</section>
				<!-- <section class="freelance">
					<a id="freelance"></a>
					<h3>Freelance</h3>
					<p>
						Coming Soon.
					</p>
			</section> -->
		</div>
    `
})
export class AppComponent implements OnInit {
    public aboutMD: string = '';
    public resumeMD : string = '';
    public frontEnds: FrontEnd[] = [];

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
		
		this.http.get(CONSTANTS.RETHINK_BASE_URL + 'frontEnds')
			.map(res => res.json())
			.subscribe(res => {
				this.frontEnds = Utils.processFrontEnds(res.frontEnds, CONSTANTS.APP_NAME);
			});
	}
}
