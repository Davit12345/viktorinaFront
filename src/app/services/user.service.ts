import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageProvider} from "../providers/storage";
import {User} from "../models/profile/user.model";
import {of} from "rxjs";
import {LoginUser} from "../models/profile/login-user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService{


  private ProfileUrl = environment.ProfileUrl+"users";

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this._storage.isUserLogined()
  });

  unAuthorizedHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient,private _storage:StorageProvider) {

  }
  public  getUserData(formData:any){
    return this.http.post<any>(this.ProfileUrl + 'get-user-data', formData,{headers:this.headers});
  }
  public  login(formData:LoginUser){
    return this.http.post<any>(this.ProfileUrl + '/login', {user:formData},{headers:this.unAuthorizedHeaders});
  }

    public  register(user:User){
    return this.http.post<any>(this.ProfileUrl , {user:user},{headers:this.unAuthorizedHeaders});
  }
}
