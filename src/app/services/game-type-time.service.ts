import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageProvider} from "../providers/storage";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameTypeTimeService {
  private url = environment.ProfileUrl+"game-type-time";

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this._storage.isUserLogined()
  });
  constructor(private http: HttpClient,private _storage:StorageProvider) {

  }
  public  getGameTypeTime():Observable<any>{
    return this.http.get<any>(this.url,{headers:this.headers});
  }
}
