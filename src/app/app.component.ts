import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CreateEventPage } from '../pages/create-event/create-event';
import { CategoryPage } from '../pages/category/category';
import { NotificationPage } from '../pages/notification/notification';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  userID: string;
  pages: Array<{title: string, icon: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage
  ) {
    this.storage.get('userID').then((val) => {
      this.userID = val;
      if(this.userID){
        this.rootPage = HomePage;
      }else{
        this.rootPage = LoginPage;
      }
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'ios-home-outline', component: HomePage },
      { title: 'Create Event', icon: 'ios-calendar-outline', component: CreateEventPage },
      { title: 'Categories', icon: 'ios-pricetags-outline', component: CategoryPage },
      { title: 'Notifications', icon: 'ios-notifications-outline', component: NotificationPage },
      { title: 'Profile', icon: 'ios-person-outline', component: ProfilePage },
      { title: 'Log Out', icon: 'ios-log-out-outline', component: LoginPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == "Log Out"){
      this.storage.remove('userID');
    }
    this.nav.setRoot(page.component);
  }
}
