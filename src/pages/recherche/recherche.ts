import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PostProviders } from '../../providers/post-providers';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-recherche',
  templateUrl: 'recherche.html',
})
export class RecherchePage {
  groupe: string;
  rh: string;
  numero: number;
  blads: any =[];
  blods: any =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, private postPvdr: PostProviders,private iab: InAppBrowser,
    private callNumber: CallNumber) {
  }

  ionViewDidLoad(){
   this.groupe ="";
   this.rh = "";
   
  }

openWebpage(){
  const options: InAppBrowserOptions = {
    zoom: 'no'
  }
  const browser = this.iab.create('http://www.lumir.org', '_system');
  
}
call(numero)
{

  this.callNumber.callNumber(numero, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}

  search() {
    
    if(this.groupe != "" && this.rh != ""){
      
      console.log(this.groupe);
      let body = {
        groupe: this.groupe,
        rh: this.rh
      };
    
      this.postPvdr.postData(body, 'search.php').subscribe(data =>{
        for(let blad of data.result){
          this.blads.push(blad);
        }
      });
      this.postPvdr.postData(body, 'serachH.php').subscribe(data =>{
        for(let blod of data.result){
          this.blods.push(blod);
        }
      });

      setTimeout(
        ()=>{
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        }, 30000
      );

    }else {
 
      const toast = this.toastCtrl.create({
        message: 'Données erroné',
        duration: 3000
      });
      toast.present();

    }
    
  }

}
