import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {StorageProvider} from "../providers/storage";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardOutService  implements CanActivate {
  constructor(private _storage: StorageProvider,
              private _router: Router) { }

  canActivate(): boolean {
    if (!this._storage.isUserLogined()) {
      return true
    } else {
      this._router.navigate(['/tabs/categories'])
      return false
    }
  }
}
