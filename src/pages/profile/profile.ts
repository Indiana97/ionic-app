import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  proData: any;
  categoryList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.proData = {
      userName: 'DzmitryDDb',
      userEmail: 'Dzmitry@test.com',
      userType: 'Creator',
      category: ['1', '5', '6'],
      phone: '123456789',
      zipCode: '12345',
      description: 'test',
      distance: 350
    }

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
    console.log('ionViewDidLoad ProfilePage');
  }

  save() {
    console.log(this.proData);
  }

}
