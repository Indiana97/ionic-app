import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home'
import { BaseService } from "../../providers/base-service";
import { UserService } from "../../providers/user-service";
import { Observable } from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userData: any;
  isRemember: boolean = false;
  isLoading: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {
    this.userData = { userEmail: '', password: ''};
    this.isLoading = this.loadingCtrl.create({
      content: "Please wait...",
      spinner: 'bubbles',
      duration: 3000
    });
  }

  ionViewDidLoad() {
    this.storage.get('userData').then((val) => {
      (val) ? this.userData = val : this.userData = {};
    });
  }



  doLogin() {

    this.navCtrl.setRoot(HomePage);
    let toast1 = this.toastCtrl.create({
      message: 'Please Enter Email and Password',
      duration: 2000,
      position: 'bottom',
      cssClass: 'cusToast'
    });

    let toast2 = this.toastCtrl.create({
      message: 'Email/Password is invalid',
      duration: 2000,
      position: 'bottom'
    });

    // if(this.userData.userEmail && this.userData.password){
    //   this.isLoading.present();
    //   this.userService.login(this.userData)
    //     .subscribe(
    //       (data) => {
    //         this.isLoading.dismiss();
    //         (this.isRemember) ? this.storage.set('userData', this.userData): this.storage.clear();
    //         this.storage.set('userID', data);
    //         this.navCtrl.setRoot(HomePage);
    //         return true;
    //       },
    //       err => {
    //         console.log('errorData', err);
    //         toast2.present();
    //         return true;
    //       });
    //   }else{
    //     toast1.present();
    //   }
  }




  register() {
    this.navCtrl.push('RegisterPage');
  }

}
