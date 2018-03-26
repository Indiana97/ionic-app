import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { BaseService } from "../../providers/base-service";
import { DataService } from "../../providers/data-service";
import { Observable } from 'rxjs/Rx';


@IonicPage()
@Component({
  selector: 'page-details-event',
  templateUrl: 'details-event.html',
})
export class DetailsEventPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public baseService: BaseService,
    public dataService: DataService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage

  ) {
  }

  ionViewDidLoad() {

  }

}
