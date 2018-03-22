import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CreateEventPage } from '../pages/create-event/create-event';
import { CategoryPage } from '../pages/category/category';
import { NotificationPage } from '../pages/notification/notification';
import { ProfilePage } from '../pages/profile/profile';
import { AdminPage } from '../pages/admin/admin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{title: string, icon: string, component: any, style: boolean}>;
  isAdmin: boolean = false;
  isCreator: boolean = false;
  isNormal: boolean = true;
  isShowMenu: boolean = false;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public events: Events
  ) {

    events.subscribe('logged:in', (userType) => {
      console.log('logged:in', userType);
      if (userType == 'admin') {
        this.isAdmin = true;
        console.log(this.isAdmin);
      } else if (userType == 'creator') {
        this.isCreator = true;
        console.log(this.isCreator);
      } else {
        console.log(userType);
      }
      this.pages = [
        { title: 'Home', icon: 'ios-home-outline', component: HomePage, style: this.isNormal },
        { title: 'Admin', icon: 'ios-contact-outline', component: AdminPage, style: this.isAdmin },
        { title: 'Create Event', icon: 'ios-calendar-outline', component: CreateEventPage, style: this.isCreator },
        { title: 'Categories', icon: 'ios-pricetags-outline', component: CategoryPage, style: this.isNormal },
        { title: 'Notifications', icon: 'ios-notifications-outline', component: NotificationPage, style: this.isNormal },
        { title: 'Profile', icon: 'ios-person-outline', component: ProfilePage, style: this.isNormal },
        { title: 'Log Out', icon: 'ios-log-out-outline', component: LoginPage, style: this.isNormal },
      ];
    });

    this.storage.get('userAccess').then((val) => {
      console.log(val);
      if(val){
        this.rootPage = HomePage;
      }else{
        this.rootPage = LoginPage;
      }
    });

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.title == "Log Out"){
      this.storage.remove('userAccess');
    }
    this.nav.setRoot(page.component);
  }
}
