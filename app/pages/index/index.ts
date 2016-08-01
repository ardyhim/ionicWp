import { Component } from '@angular/core';
import {HTTP_PROVIDERS, Http, Headers, RequestOptions} from '@angular/http';
import {Platform, NavController, NavParams, Modal, Toast, ViewController} from 'ionic-angular';
import {SinglePage} from '../single/single';


/*
  Generated class for the IndexPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/index/index.html',
})
export class IndexPage {
  posts = [];
  pagi: number = 1;
  nomore: boolean = false;
  url: string = "http://kirik.pe.hu/wp-json/wp/v2/posts/?_embed&?filter[order]=DESC&filter[posts_per_page]=5&page=";
  constructor(private nav: NavController, public http: Http) {
    console.log('running');
    this.nav = nav;
    this.http.get(this.url + this.pagi).subscribe(data => {
      for (let i of data.json()) {
        this.posts.push({
          embedded: i._embedded,
          date: i.date,
          title: i.title,
          excerpt: i.excerpt,
          link: i._links
        });
      }
    });
  }

  openSinglePage(url) {
    this.nav.push(SinglePage, {
      url: url
    });
  }

  searchPosts(ev, searchInput) {
    this.pagi = 1;
    this.url = "http://kirik.pe.hu/wp-json/wp/v2/posts?_embed&?filter[order]=DESC&filter[posts_per_page]=5&search=" + searchInput + "&page=";
    this.http.get(this.url + this.pagi).subscribe(data => {
      this.posts = [];
      for (let i of data.json()) {
        this.posts.push({
          embedded: i._embedded,
          date: i.date,
          title: i.title,
          excerpt: i.excerpt,
          link: i._links
        });
      }
    });
  }

  onCancel(ev) {
    console.log(ev.target.value);
    if (!ev.target.value) {
      this.pagi = 1;
      this.url = "http://kirik.pe.hu/wp-json/wp/v2/posts/?_embed&?filter[order]=DESC&filter[posts_per_page]=5&page=";
      this.http.get(this.url + this.pagi).subscribe(data => {
        this.posts = [];
        for (let i of data.json()) {
          this.posts.push({
            embedded: i._embedded,
            date: i.date,
            title: i.title,
            excerpt: i.excerpt,
            link: i._links
          });
        }
      });
    }
  }

  doInfinite(infiniteScroll) {
    this.pagi++;
    console.log(this.pagi);
    this.http.get(this.url + this.pagi).subscribe(data => {
      for (let i of data.json()) {
        this.posts.push({
          embedded: i._embedded,
          date: i.date,
          title: i.title,
          excerpt: i.excerpt,
          link: i._links
        });
      }
      if (data.json().length === 0) {
        let toast = Toast.create({
          message: 'Tidak ada data',
          duration: 3000
        });
        this.nav.present(toast);
      }
    });
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }

  doRefresh(refresher) {
    console.log("do refresher");
    this.pagi = 1;
    this.http.get(this.url + this.pagi).subscribe(data => {
      this.posts = [];
      for (let i of data.json()) {
        this.posts.push({
          embedded: i._embedded,
          date: i.date,
          title: i.title,
          excerpt: i.excerpt,
          link: i._links
        });
      }
    });
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
