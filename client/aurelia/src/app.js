import {inject} from 'aurelia-framework';
import {UrlConstants} from './Constants';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class App {
  constructor(http) {
    this.sections = [];
    this.aboutUrl = UrlConstants.ABOUT_URL;
    this.http = http.configure(config => {
      config.withBaseUrl(UrlConstants.RETHINK_BASE_URL);
    });
  }

  attached() {
    // cleanup the "fake" header once the real document has loaded
    var outsideHeader = document.getElementById('outside-header');
    outsideHeader.parentNode.removeChild(outsideHeader);

    this.http.fetch(UrlConstants.EXPERIENCE_URL)
      .then(response => response.json())
      .then(response => this.sections = response.experience);
  }
}
