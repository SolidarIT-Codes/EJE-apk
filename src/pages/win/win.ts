import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TestPage } from '../test/test';

/**
 * Generated class for the WinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-win',
  templateUrl: 'win.html',
})
export class WinPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WinPage');
  }
  ok()
  {
    this.navCtrl.setRoot(TestPage);
  }

}
