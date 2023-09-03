import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageProvider} from "../providers/storage";
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private ProfileUrl = environment.ProfileUrl+"/api/categories/";

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this._storage.isUserLogined()
  });
  constructor(private http: HttpClient,private _storage:StorageProvider) {

  }
  public  getCategories(formData:any):Observable<any>{
    return this.http.post<any>(this.ProfileUrl + 'get-all', formData,{headers:this.headers});
  }
}
