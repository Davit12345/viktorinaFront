import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageProvider} from "../providers/storage";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url = environment.ProfileUrl+"games/";

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this._storage.isUserLogined()
  });
  constructor(private http: HttpClient,private _storage:StorageProvider) {

  }
  public  getGameData():Observable<any>{
    return this.http.get<any>(this.url + 'simple',{headers:this.headers});
  }
}
