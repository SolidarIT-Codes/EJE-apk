import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private storage: Storage,private network: Network,public toastCtrl: ToastController) {
    this.initializeApp();
    this.data();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
     
        });
        }  

        initializeApp() {
          this.storage.get('session_storage').then((res)=>{
            if(res == null){

              this.rootPage = HomePage;
              
            } else {
              this.rootPage = TabsPage;
            }
          });}

          data(){
                            // watch network for a disconnection
                let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
                  console.log('network was disconnected :-(');
                  const toast = this.toastCtrl.create({
                    message: 'Verifier votre connexion ☺',
                    duration: 3500
                  });
                  toast.present();
                });

                // stop disconnect watch
                disconnectSubscription.unsubscribe();


                // watch network for a connection
                let connectSubscription = this.network.onConnect().subscribe(() => {
                  console.log('network connected!');
                  // We just got a connection but we need to wait briefly
                  // before we determine the connection type. Might need to wait.
                  // prior to doing any api requests as well.
                  setTimeout(() => {
                    if (this.network.type === 'wifi') {
                      console.log('we got a wifi connection, woohoo!');
                    }
                  }, 3000);
                });
                           // stop disconnect watch
                           connectSubscription.unsubscribe();
          }
        
     } 
