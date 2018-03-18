import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CreateEventPage } from '../pages/create-event/create-event';
import { CategoryPage } from '../pages/category/category';
import { NotificationPage } from '../pages/notification/notification';
import { ProfilePage } from '../pages/profile/profile';

import { BaseService } from '../providers/base-service';
import { UserService } from '../providers/user-service';
import { DataService } from "../providers/data-service";
import { MapProvider } from "../providers/map/map";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CreateEventPage,
    CategoryPage,
    NotificationPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CreateEventPage,
    CategoryPage,
    NotificationPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BaseService,
    UserService,
    DataService,
    MapProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
