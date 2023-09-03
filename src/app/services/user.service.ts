import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageProvider} from "../providers/storage";

@Injectable({
  providedIn: 'root'
})
export class UserService{


  private ProfileUrl = environment.ProfileUrl+"/api/users/";

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
  public  login(formData:any){
    return this.http.post<any>(this.ProfileUrl + 'login', formData,{headers:this.unAuthorizedHeaders});
  }
    public  register(formData:any){
    return this.http.post<any>(this.ProfileUrl + 'register', formData,{headers:this.unAuthorizedHeaders});
  }
}
