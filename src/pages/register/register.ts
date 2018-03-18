import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { BaseService } from "../../providers/base-service";
import { UserService } from "../../providers/user-service";
import { Observable } from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  resData: any;
  userTypeList: any = [];
  comfirmPass: string;
  loading;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public userService: UserService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {
    this.userTypeList = [
      { value: 0, name: 'Normal'},
      { value: 1, name: 'Creator' }];
    this.resData = {}
    this.comfirmPass = '';
    this.loading = this.loadingCtrl.create({

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  submit() {
    if(this.resData.password != this.comfirmPass){
      this.toastAlert("Password and Confirm Password not matching");
    } else if (this.resData.userName && this.resData.email && this.resData.userType && this.resData.password && this.resData.phoneNumber && this.resData.zipCode){
      console.log(this.resData);
      this.loading.present();
      this.userService.signup(this.resData)
        .subscribe(
          (data) => {
            this.loading.dismiss();
            this.toastAlert("Success!")
            this.viewCtrl.dismiss();
            return true;
          },
          err => {
            console.log('errorData', err);
            this.toastAlert('SignUp Error');
            return true;
          });
      }else{
        this.toastAlert("All Fields are necessary for signup");
      }
  }

  toastAlert(val) {
    let toast = this.toastCtrl.create({
      message: val,
      duration: 2000,
      position: 'bottom',
      cssClass: 'cusToast'
    });
    toast.present();
  }

  back() {
    this.viewCtrl.dismiss();
  }

}
