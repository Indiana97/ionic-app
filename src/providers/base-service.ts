import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BaseService {

  public baseURL = "http://localhost:3000/";
  public loginURL = this.baseURL + "login";
  public signupURL = this.baseURL + "signup";
  public userTypeURL = this.baseURL + "user/type";
  public profileURL = this.baseURL + "user/details";
  public userUpdateURL = this.baseURL + "user/update";
  public eventDataURL = this.baseURL + "all/events";
  public createEventURL = this.baseURL + "event/create";
  public updateEventURL = this.baseURL + "event/update";
  public adminNewEventURL = this.baseURL + "admin/new/events";
  public adminAllUsersURL = this.baseURL + "admin/all/users";
  public adminDelUsersURL = this.baseURL + "admin/delete/user";
  public adminDelEventURL = this.baseURL + "admin/delete/event";
  public approveEventURL = this.baseURL + "admin/approve/event";

  constructor(public http: Http) {
    console.log('Hello BaseService Provider');
  }


}
