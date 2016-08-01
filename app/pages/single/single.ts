import { Component } from '@angular/core';
import {HTTP_PROVIDERS, Http, Headers, RequestOptions} from '@angular/http';
import {Platform, NavController, NavParams, Modal, Toast, ViewController} from 'ionic-angular';
import {CommentPage} from '../comment/comment';
declare var AdMob: any;
/*
  Generated class for the SinglePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/single/single.html',
})
export class SinglePage {
  url;
  urlComment;
  content;
  title;
  posts;
  authors = [];
  thumbnails = [];
  category = [];
  comments = [];
  private admobId: any;

  constructor(private platform: Platform, params: NavParams, public nav: NavController, public http: Http) {

    this.platform = platform;
    if (/(android)/i.test(navigator.userAgent)) {
      this.admobId = {
        banner: 'ca-app-pub-5562706708503981/2737475152',
      };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      this.admobId = {
        banner: 'ca-app-pub-5562706708503981/2737475152',
      };
    }

    this.platform.ready().then(() => {
      if (AdMob) {
        AdMob.createBanner({
          adId: this.admobId.banner,
          position: AdMob.AD_POSITION.BOTTOM_CENTER,
          autoShow: true
        });
      }
    });

    this.url = params.data.url;
    this.http.get(this.url + '/?_embed').subscribe(data => {
      this.posts = [];
      this.posts = data.json();
      this.authors = data.json()._embedded.author;
      this.thumbnails = data.json()._embedded['https://api.w.org/featuredmedia'];
      this.content = data.json().content.rendered;
      this.title = data.json().title.rendered;
      this.urlComment = data.json()._links.replies[0].href;
      this.http.get(this.urlComment).subscribe(data => {
        this.comments = data.json();
      });
    });
  }
  openModal(url) {
    let modal = Modal.create(CommentPage, {
      url: url
    });
    this.nav.present(modal);
  }

}
