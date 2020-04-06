import { Component } from '@angular/core';
import { NavController, App, AlertController, Platform, ToastController } from 'ionic-angular';
import { PostProviders } from '../../providers/post-providers';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  cle: number;
  pet: string;
  badge: string;
  nom: string;
  id: string;
  statut: string;
  toni: string;
  infos: any =[];
  histos: any =[];
  constructor(public toastCtrl: ToastController, public navCtrl: NavController, private platform: Platform,
     private postPvdr: PostProviders,
    public app: App, public alertCtrl: AlertController,private push: Push, private storage: Storage) {
      platform.ready().then(() => {
        this.pushSetup();
          });
  }
 
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    
    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      refresher.complete();
    }, 2000);
  }

      ionViewDidLoad() {
        this.pet = 'kittens';
        this.charge();
        this.lod();
      }
      take(key){
        this.storage.get('session_storage').then((val) => {
          this.toni = val;
          this.id = this.toni['id'];
      this.nom = this.toni['Nom'];
      this.statut = this.toni['Statut'];
      //------//

      let body ={
        cle: key,
        aid : this.id,
        Index : this.id,
        name : this.nom,
        aksi: 'texto'
      };
      this.postPvdr.postData(body, 'alvalid.php').subscribe(data =>{
        if (data.success) {
          this.postPvdr.postData(body, 'etoiles.php').subscribe((data)=>
          {
              if(data.success){
                const toast = this.toastCtrl.create({
                  message: 'Vellez vous rendre urgement à l`hôpital indiquer',
                  duration: 3000
                });
                toast.present()

              }else{
                const toast = this.toastCtrl.create({
                  message: 'Une Erreur à eu lieu',
                  duration: 3000
                });
                toast.present();
              }
          }); 
        }
        this.navCtrl.setRoot(this.navCtrl.getActive().component); 
      });
        });
        

      }

      charge() {
        let body ={
      
        };
      
        this.postPvdr.postData(body, 'alnew.php').subscribe(data =>{

          if (data.result != "") {
            for(let info  of data.result){
              this.infos.push(info);
            }
          } else {
              
      this.badge ="Aucune Alerte Disponible ";
      console.log(this.badge);
          }
          
        });
        setTimeout(
          ()=>{
            this.navCtrl.setRoot(NotificationPage);
          }, 30000
        );
      }

      //------//


      lod() {
        this.storage.get('session_storage').then((val) => {
          this.toni = val;
          this.id = this.toni['id'];
      this.nom = this.toni['Nom'];
      this.statut = this.toni['Statut'];
      
      //------//
      let body ={
       nom : this.nom
      };
    
      this.postPvdr.postData(body, 'alinf.php').subscribe(data =>{
        for(let histo  of data.result){
          this.histos.push(histo);
        }
      });
      
        });
        
        
      }




              pushSetup(){
                // to check if we have permission
        this.push.hasPermission()
        .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

        });

        // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
        this.push.createChannel({
        id: "testchannel1",
        description: "My first test channel",
        // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
        importance: 3
        }).then(() => console.log('Channel created'));

        // Delete a channel (Android O and above)
        this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

        // Return a list of currently configured channels
        this.push.listChannels().then((channels) => console.log('List of channels', channels))

        // to initialize push notifications

        const options: PushOptions = {
        android: {
        senderID: '119693643428'
        },
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        }
        };

        const pushObject: PushObject = this.push.init(options);


        pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

        pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
        }


}
