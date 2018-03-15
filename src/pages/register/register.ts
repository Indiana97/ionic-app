import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  resData: any = {};
  userTypeList: any = [];
  comfirmPass: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.userTypeList = [ { value: 0, name: 'Creator'}];
    this.resData = {
      userName: '',
      email: '',
      userType: '',
      password: '',
      phoneNum: '',
      zipCode: ''
    }
    this.comfirmPass = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  submit() {

  }

  back() {
    this.viewCtrl.dismiss();
  }

}
