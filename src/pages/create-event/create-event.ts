import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {


  eventData: any={};
  categoryList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.categoryList = [
      { id: 0, name: 'Category1' },
      { id: 1, name: 'Category2' },
      { id: 2, name: 'Category3' },
      { id: 3, name: 'Category4' },
      { id: 4, name: 'Category5' },
      { id: 5, name: 'Category6' },
      { id: 6, name: 'Category7' },
      { id: 7, name: 'Category8' }
    ]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

  save() {
    console.log(this.eventData);
  }
}
