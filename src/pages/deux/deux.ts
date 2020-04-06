import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EchecPage } from '../echec/echec';
import { TroisPage } from '../trois/trois';

/**
 * Generated class for the DeuxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-deux',
  templateUrl: 'deux.html',
})
export class DeuxPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeuxPage');
  }
  oui()
  {
    this.navCtrl.setRoot(EchecPage);
  }
  non()
  {
    this.navCtrl.setRoot(TroisPage);
  }

}
