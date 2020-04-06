import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TestPage } from '../test/test';

/**
 * Generated class for the EchecPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-echec',
  templateUrl: 'echec.html',
})
export class EchecPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EchecPage');
  }
  ok()
  {
    this.navCtrl.setRoot(TestPage)
  }

}
