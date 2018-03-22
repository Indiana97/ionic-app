import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseService } from "../../providers/base-service";
import { UserService } from "../../providers/user-service";
import { DataService } from "../../providers/data-service";
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchQuery: string = '';
  items: any = [];
  userId: string;
  eventList: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public baseService: BaseService,
    public userService: UserService,
    public dataService: DataService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {
      // this.initializeItems();
  }

  ionViewDidLoad() {



    this.storage.get('userAccess').then((val) => {
      console.log(val);
      this.userId = val.userID;
      this.events.publish('logged:in', val.userType);
      console.log('userType', val.userType);

      // this.userId ? this.getEventData() : console.log('ff');
    });
  }

  // getEventData() {
  //   let loading = this.loadingCtrl.create({
  //     content: "Please wait...",
  //     spinner: 'bubbles',
  //     duration: 3000
  //   });
  //   loading.present();
  //   let url = this.baseService.eventDataURL;
  //   let data = { userId: this.userId };
  //   this.dataService.getData(url, data)
  //     .subscribe(
  //       (data) => {
  //         loading.dismiss();
  //         console.log('eventData', data);
  //         return true;
  //       },
  //       err => {
  //         loading.dismiss();
  //         console.log('errorData', err);
  //         return true;
  //       });
  // }

  getItems(event){

  }



  // initializeItems() {
  //   this.items = [
  //     { id: 0, title: 'Event1' },
  //     { id: 1, title: 'Event2' },
  //     { id: 2, title: 'Event3' }
  //   ];
  // }

  // getItems(ev: any) {
  //   // Reset items back to all of the items
  //   this.initializeItems();

  //   // set val to the value of the searchbar
  //   let val = ev.target.value;

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.items = this.items.filter((item) => {
  //       return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
  // }
}
