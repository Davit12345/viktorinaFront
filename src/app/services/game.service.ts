import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";
import {StorageProvider} from "../providers/storage";
import {Observable} from "rxjs";
import {Result} from "../private/game/shared/Result";

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
  public  getGameData(categories:any):Observable<any>{
    // let encodedArray = encodeURIComponent(JSON.stringify(categories?.categories));
   let url =this.url+  'simple'
    return this.http.get<any>(`${url}/${categories}`,{headers:this.headers});
  }

  public  saveResult(result:any):Observable<any>{

    return this.http.post<any>(this.url+'simple/result',result,{headers:this.headers});
  }


}
