import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseService } from "../../providers/base-service";
import { UserService } from "../../providers/user-service";
import { DataService } from "../../providers/data-service";
import { Observable } from 'rxjs/Rx';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileData: any;
  categoryList: any;
  url: string;
  userId: string;
  isLoading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseService,
    public userService: UserService,
    public dataService: DataService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {

    this.profileData = { }

    this.categoryList = [
      { id: 0, itemName: 'category 1' },
      { id: 1, itemName: 'category 2' },
      { id: 2, itemName: 'category 3' },
      { id: 3, itemName: 'category 4' },
      { id: 4, itemName: 'category 5' },
      { id: 5, itemName: 'category 6' },
      { id: 6, itemName: 'category 7' },
      { id: 7, itemName: 'category 8' }
    ];

    this.isLoading = this.loadingCtrl.create({
      content: "Please wait...",
      spinner: 'bubbles',
      duration: 3000
    });

  }

  ionViewDidLoad() {
    this.storage.get('userAccess').then((val) => {
      console.log(val);
      this.userId = val.userID;
      this.userId?this.getProfileData(): console.log('ff');
    });
  }

  selectedItems() {
    console.log(this.profileData.category);
  }

  getProfileData() {
    this.isLoading.present();
    this.url = this.baseService.profileURL;
    let data = { userId: this.userId };
    this.dataService.getData(this.url, data)
      .subscribe(
        (data) => {
          this.isLoading = false;
          console.log('profileData', data);
          this.profileData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

  fileEvent($event) {
    let file = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = (loadEvent: any) => {
      this.profileData.image = loadEvent.target.result;
      // console.log('file load', loadEvent.target.result);
    };
    myReader.readAsDataURL(file);
  }

  gotCategory(value){
    console.log(value);
  }

  save(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    let url = this.baseService.userUpdateURL;
    this.dataService.updateData(url, this.profileData)
      .subscribe(
        (data) => {
          loading.dismiss();
          console.log('profileData', data);
          this.profileData = data;
          return true;
        },
        err => {
          this.isLoading = false;
          console.log('errorData', err);
          return true;
        });
  }

}
