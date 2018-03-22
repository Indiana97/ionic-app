import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, ItemSliding } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseService } from "../../providers/base-service";
import { UserService } from "../../providers/user-service";
import { DataService } from "../../providers/data-service";
import { AdminService } from "../../providers/admin-service";
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  userId: string;
  newEvents: any = [];
  allUsers: any = [];
  allEvents: any = [];

  segValue: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseService,
    public userService: UserService,
    public dataService: DataService,
    public adminService: AdminService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {

    this.segValue = 'events';

  }

  ionViewDidLoad() {
    this.storage.get('userAccess').then((val) => {
      console.log(val);
      this.userId = val.userID;
      this.getEventData();
    });

  }

  segmentChanged(event) {
    console.log(this.segValue);
    switch (this.segValue) {
      case "events":
        this.getEventData();
        break;
      case "users":
        this.getAllUser();
        break;
      case "approved":
        this.approvedEventData();
        break;
    }
  }

  getEventData() {
    this.adminService.getData(this.baseService.adminNewEventURL)
      .subscribe(
        (data) => {
          this.newEvents = data;
          console.log('newEvent', this.newEvents);
          return true;
        },
        err => {
          console.log('errorNewEvent', err);
          return true;
        });
    }

    getAllUser() {
      this.adminService.getData(this.baseService.adminAllUsersURL)
        .subscribe(
          (data) => {
            this.allUsers = data;
            console.log('allUsersData', this.allUsers);
            return true;
          },
          err => {
            console.log('errorData', err);
            return true;
          });
    }

    approvedEventData() {
      let that = this;
      const data = { 'userId': this.userId };
      this.dataService.getData(this.baseService.eventDataURL, data)
        .subscribe(
          (data) => {
            that.allEvents = data;
            console.log('approData', this.allEvents);
            return true;
          },
          err => {
            console.log('errorData', err);
            return true;
          });
    }


    doApproveEvent(eventId) {
      const data = { 'eventId': eventId}
      this.dataService.updateData(this.baseService.approveEventURL, data)
        .subscribe(
          (data) => {
            this.getEventData();
            console.log('getEventData', data);
            return true;
          },
          err => {
            console.log('errorData', err);
            return true;
          });
      }


    deleteEvent(id, slidingItem: ItemSliding) {
      slidingItem.close();
      let confirm = this.alertCtrl.create({
        title: "Are you sure?",
        message: "Want to delete Event ?",
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.deleteEventData(id);
            }
          }
        ]
      });
      confirm.present();
    }

    deleteUser(id, slidingItem: ItemSliding) {
      slidingItem.close();
      let confirm = this.alertCtrl.create({
        title: "Are you sure?",
        message: "Want to delete User? Deleting User will delete all their Events.",
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.deleteUserData(id);
            }
          }
        ]
      });
      confirm.present();
    }

    deleteEventData(id) {
      console.log('deleteEventData', id);
    }

    deleteUserData(id) {
      console.log('deleteUser', id)
    }


}
