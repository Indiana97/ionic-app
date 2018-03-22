import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home'
import { BaseService } from "../../providers/base-service";
import { UserService } from "../../providers/user-service";
import { DataService } from "../../providers/data-service";
import { Observable } from 'rxjs/Rx';


@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;
  eventData: any= {};
  categoryList: any;
  userId: string;
  address: any = '';
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

  }

  ionViewDidLoad() {
    this.initAutocomplete();
    this.storage.get('userAccess').then((val) => {
      console.log(val);
      this.eventData.userId = val.userID;
    });
  }

  initAutocomplete(): void {
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
    });
  }


  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    // autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        let autoCompleteValue: any = autocomplete;
        console.log(autocomplete);
        this.eventData.location = autoCompleteValue.gm_accessors_.place.dd.l;
      });
    });
  }

  fileEvent($event) {
    let file = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (loadEvent: any) => {
      this.eventData.image = loadEvent.target.result;
      // console.log('file load', loadEvent.target.result);
    };
    myReader.readAsDataURL(file);
  }

  save() {
    console.log(this.eventData);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    const url = this.baseService.createEventURL;
    this.dataService.createData(url, this.eventData)
      .subscribe(
        (data) => {
          loading.dismiss();
          console.log('eventData', data);
          this.navCtrl.setRoot(HomePage);
          return true;
        },
        err => {
          loading.dismiss();
          console.log('errorData', err);
          return true;
        });
  }
}
