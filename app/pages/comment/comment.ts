import { Component } from '@angular/core';
import {HTTP_PROVIDERS, Http, Headers, RequestOptions} from '@angular/http';
import {Platform, NavController, NavParams, Modal, Toast, ViewController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/common';
/*
  Generated class for the CommentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/comment/comment.html',
})
export class CommentPage {

  loginForm;
  constructor(public viewCtrl: ViewController, public nav: NavController, public params: NavParams, public http: Http, FB: FormBuilder) {
    this.loginForm = FB.group({
      author_name: ["", Validators.required],
      author_email: ["", Validators.required],
      content: ["", Validators.required]
    });
  }

  doLogin(event) {
    if (this.loginForm.value.name != "" && this.loginForm.value.email != "" && this.loginForm.value.content != "") {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.post(this.params.data.url, JSON.stringify(this.loginForm.value), options).subscribe(data => {
        if (data.statusText === "Created") {
          let toast = Toast.create({
            message: 'Succes comments',
            showCloseButton: true,
            closeButtonText: 'Ok'
          });
          this.viewCtrl.dismiss();
          this.nav.present(toast);
        }
      });
    }

    event.preventDefault();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
