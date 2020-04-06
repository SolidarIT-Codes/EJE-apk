import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams , App, LoadingController, ToastController, AlertController} from 'ionic-angular';
import { PostProviders } from '../../providers/post-providers';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-actufo',
  templateUrl: 'actufo.html',
})
export class ActufoPage {
  badge: string;
  actus: any =[];
  toni: any;
  id:any;
  statut:any;
  note: number;
  swipe: number = 0;
  scannedCode = null;
  constructor(public toastCtrl: ToastController,public navCtrl: NavController,
    public loadingCtrl: LoadingController, public navParams: NavParams,public alertCtrl: AlertController,
     private postPvdr: PostProviders,private storage: Storage,
     public app: App, private barcodeScanner : BarcodeScanner) 
     {
  }
  
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    
    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      refresher.complete();
    }, 2000);
  }
    
  
  

  ionViewDidLoad(){
    this.storage.get('session_storage').then((val) => {
      this.toni = val;
      this.statut = this.toni['Statut'];
  });
    const loader = this.loadingCtrl.create({
      content: "Patientez...",
      duration: 300
    });
    loader.present();
  this.charge();
  }

  charge() {
    let body ={
  
    };
  
    this.postPvdr.postData(body, 'actu.php').subscribe(data =>{
      if (data.result != "") {
        for(let actu of data.result){
          this.actus.push(actu);
        }
      } else {
      this.badge ="Aucune Information Disponible ";
      console.log(this.badge);
      }

      
    });
  }

    scan()
    {
      this.storage.get('session_storage').then((val) => {
        this.toni = val;
        this.id = this.toni['id'];
  this.note = this.toni['Points'];
  console.log(this.note);
    });
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);
        this.scannedCode = barcodeData.text;

        if (this.scannedCode ) {
          let body ={
            Nom: barcodeData.text,
            Note: this.note,
            Index: this.id
          };
        
          this.postPvdr.postData(body, 'camp.php').subscribe(data =>{
            if (data.result != "") {
              this.postPvdr.postData(body, 'etoiles.php').subscribe((data)=>
              {
                  if(data.success){
                    const alert = this.alertCtrl.create({
                      title: 'Félicitation!',
                      subTitle: 'Vous venez de valider votre don de sang',
                      buttons: ['OK']
                    });
                    alert.present();

                  }else{
                    const toast = this.toastCtrl.create({
                      message: 'Une Erreur à eu lieu',
                      duration: 3000
                    });
                    toast.present();
                  }
              }); 
  
            } else {
            this.scannedCode ="Erreur de QR Code ";
            
            const toast = this.toastCtrl.create({
              message: 'Vous vous êtes tromper de QR Code',
              duration: 3000
            });
            toast.present();
            }
      
            
          });
        }
        const loader = this.loadingCtrl.create({
          content: "Patientez...",
          duration: 4000
        });
        loader.present();
        
       }).catch(err => {
           console.log('Error', err);
       });
    }

}
