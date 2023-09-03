import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageProvider} from "../providers/storage";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private ProfileUrl = environment.ProfileUrl+"/api/game/";

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this._storage.isUserLogined()
  });
  constructor(private http: HttpClient,private _storage:StorageProvider) {

  }
  public  getGameData(formData:any):Observable<any>{
    return this.http.post<any>(this.ProfileUrl + 'get-data', formData,{headers:this.headers});
  }
}
