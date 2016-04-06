import {Component, OnInit, provide} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Response} from 'angular2/http';
import {AppConstants, UrlConstants} from './Constants';

// Directives
import {MarkdownComponent} from './markdown.component';
import {SwapPageComponent} from './swap-page.component';
import {StickyHeaderComponent} from './sticky-header.component';
import {AnchorComponent} from './anchor.component';
import {ProgressTrackerComponent} from './progress-tracker.component';

// Services
import {ScrollKeeper} from './scroll-keeper.service';
import EventRegistrar from 'event-registrar';
import {WatchCSSMedia} from 'watch-css-media';

// Misc
import 'rxjs/Rx';
import Utils from './shared/utils';
import {FrontEnd} from './objects/frontEnd.interface';

@Component({
	selector: 'angular-app',
	providers: [
        HTTP_PROVIDERS,
        ScrollKeeper,
        EventRegistrar,
        provide(WatchCSSMedia, {useValue: WatchCSSMedia()})
    ],
	directives: [
        MarkdownComponent,
        SwapPageComponent,
        StickyHeaderComponent,
        AnchorComponent,
        ProgressTrackerComponent
    ],
	template: `
        <div>
            <header class="static-header">
				<div class="title">Chris Bauer</div>
                <progress-tracker></progress-tracker>
				<swap-page [frontEnds]="frontEnds"></swap-page>
			</header>
            <sticky-header [frontEnds]="frontEnds"></sticky-header>
			<div>
				<section class="about">
                    <anchor [anchorId]="'about'" [anchorTitle]="'About'"></anchor>
					<h3>About</h3>
					<markdown [mdSrc]="aboutMD"></markdown>
				</section>
				<section>
					<h3>Work Experience</h3>
				</section>
				<section *ngFor="#section of sections">
					<anchor [anchorId]="section.key" [anchorTitle]="section.title"></anchor>
					<h3>{{section.title}}</h3>
					<markdown [mdSrc]="section.content"></markdown>
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
    //public resumeMD : string = '';
	public sections : {key: string, content: string, title: string}[] = [];
    public frontEnds: FrontEnd[] = [];

	constructor(private http: Http) {
	
	}

	ngOnInit () {
		this.http.get(UrlConstants.RETHINK_BASE_URL + UrlConstants.ABOUT_URL)
			.map(res => res.json())
			.subscribe(res => {
				this.aboutMD = res.content;
			});
            
        // this.http.get(UrlConstants.RETHINK_BASE_URL + UrlConstants.RESUME_URL)
			// .map(res => res.json())
			// .subscribe(res => {
			// 	this.resumeMD = res.content;
			// });

		this.http.get(UrlConstants.RETHINK_BASE_URL + UrlConstants.EXPERIENCE_URL)
			.map(res => res.json())
			.subscribe(res => {
				this.sections = res.experience;
			});
		
		this.http.get(UrlConstants.RETHINK_BASE_URL + UrlConstants.FRONT_ENDS_URL)
			.map(res => res.json())
			.subscribe(res => {
				this.frontEnds = Utils.processFrontEnds(res.frontEnds, AppConstants.APP_NAME);
			});
	}
}
