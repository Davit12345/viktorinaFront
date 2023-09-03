import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageProvider} from '../providers/storage';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(private _storage: StorageProvider,
                private _router: Router,) {
    }


    canActivate(data: any): boolean {

        if (this._storage.isUserLogined()) {
            return true;
        } else {
            this._router.navigate(['/login']);
            return false;
        }
    }


}
