import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PostProviders } from '../../providers/post-providers';
import { HomePage } from '../home/home';
import { App } from 'ionic-angular';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})

export class ProfilPage {
  rootPage:any = HomePage;
toni: any;
moyes: any =[];
moies: any =[];
id: number;
nom: any;
note:any;
prenom: any;
statut: any;
  constructor(public navCtrl: NavController,private app: App, public navParams: NavParams, 
    private storage: Storage, private postPvdr: PostProviders,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.storage.get('session_storage').then((val) => {
      this.toni = val;
      this.id = this.toni['id'];
  this.nom = this.toni['Nom'];
  this.prenom = this.toni['Prenoms'];
  this.statut = this.toni['Statut'];
  this.note = this.toni['Points'];
  let body = {
    Index: this.id
  };
  this.postPvdr.postData(body, 'moyenne.php').subscribe(data =>{
    for(let moye of data.result){
      this.moyes.push(moye);
    }
  });
  let bod = {
    Index: this.id
  };
  this.postPvdr.postData(bod, 'moyenne_tr.php').subscribe(data =>{
    for(let moie of data.result){
      this.moies.push(moie);
    }
  });
    });
    
  }
  
  logout() {
    const loader = this.loadingCtrl.create({
      content: "Patientez...",
      duration: 4000
    });
    loader.present();
    let body = {
      aksi: 'out'
    };
    this.postPvdr.postData(body,'logout.php').subscribe((data)=>{
    this.storage.set('session_storage', data.result);
    this.storage.get('session_storage').then((val) => {
      console.log('data', val);
    });
  });
  setTimeout(
    ()=>{
  this.app.getRootNav().setRoot(HomePage);
  this.storage.get('session_storage').then((val) => {
    console.log('data', val);
  });
    }, 3000
  );
    
  }

  

}
