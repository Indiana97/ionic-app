import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';


/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

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
    console.log('ionViewDidLoad CategoryPage');
  }

  delete(slidingItem: ItemSliding) {
    slidingItem.close();
  }

}
