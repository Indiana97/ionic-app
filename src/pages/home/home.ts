import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DetailsEventPage } from '../details-event/details-event';
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
      this.userId = val.userID;
      let userType = val.userType;
      this.events.publish('logged:in', val.userType);
      userType == 'admin'? this.getEventData(this.userId): console.log(this.userId);
    });
  }

  getEventData(id) {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      spinner: 'bubbles',
      duration: 3000
    });
    loading.present();
    let data = {userId: id};
    this.dataService.getData(this.baseService.eventDataURL, data)
      .subscribe(
        (data) => {
          loading.dismiss();
          this.eventList = data;
          console.log('eventData', data);

          this.eventList.sort((a: any, b: any) => {
            if (a.createdDate > b.createdDate) {
              return -1;
            } else if (a.createdDate < b.createdDate) {
              return 1;
            } else {
              return 0;
            }
          });

          this.eventList.forEach(item => {
            if (item.userId === this.userId) {
              item.editable = true;
            }
            if (item.likes) {
              item.totalLikes = item.likes.length;
              item.likes.forEach(like => {
                if (like.userId === this.userId) {
                  item.alreadyLiked = true;
                }
              });
            }
            if (item.rsvp) {
              item.totalRsvp = item.rsvp.length;
              item.rsvp.forEach(rsvp => {
                if (rsvp.userId === this.userId) {
                  item.alreadyRsvp = true;
                }
              });
            }
          });

          return true;
        },
        err => {
          loading.dismiss();
          console.log('errorData', err);
          return true;
        });
  }

  likeEvent(eventId, userId, val) {
    let data;
    let url;
    if(val == 'like'){
      data = {
        'likedUserId': this.userId,
        'eventId': eventId,
        'userId': userId
      }
      url = this.baseService.likeEventURL;
    }else{
      data = {
        'unlikedUserId': this.userId,
        'eventId': eventId
      }
      url = this.baseService.unlikeEventURL;
    }

    this.dataService.updateData(url, data)
      .subscribe(
        (data) => {
          this.getEventData(this.userId);
          return true;
        },
        err => {
          console.log('errorData', err);
          return true;
        });
  }

  rsvpCheckEvent(eventId, userId, val) {
    let data;
    let url;
    if (val == 'check') {
      data = {
        'rsvpUserId': this.userId,
        'eventId': eventId,
        'userId': userId
      }
      url = this.baseService.rsvpCheckURL;
    } else {
      data = {
        'uncheckedRsvpUserId': this.userId,
        'eventId': eventId
      }
      url = this.baseService.rsvpUncheckURL;
    }

    this.dataService.updateData(url, data)
      .subscribe(
        (data) => {
          this.getEventData(this.userId);
          return true;
        },
        err => {
          console.log('errorData', err);
          return true;
        });
  }

  eventDetails(eventId) {
    console.log(eventId);
    this.navCtrl.push(DetailsEventPage, { eventId: eventId });
  }

  initializeItems() {
    // this.items = [
    //   { id: 0, title: 'Event1' },
    //   { id: 1, title: 'Event2' },
    //   { id: 2, title: 'Event3' }
    // ];
    this.eventList;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
  //   this.initializeItems();

  //   // set val to the value of the searchbar
  //   let val = ev.target.value;
  //   console.log(val);

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     this.eventList = this.eventList.filter((item) => {
  //       console.log(item);
  //       return (item.eventName.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
    console.log(ev);
  }
}
