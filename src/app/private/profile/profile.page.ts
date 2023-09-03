import {Component, OnInit} from '@angular/core';
import {StorageProvider} from '../../providers/storage';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


    _userData:any={};

    constructor(public modalController:ModalController,public storage: StorageProvider,
                public router: Router, public _usersService: UserService) {
    }

    ionViewWillEnter() {
        this.getUserData();
    }

    getUserData() {
        this._usersService.getUserData({})
            .subscribe(
                res => {

                    this._userData = res.data;
                    if (this._userData) {
                        this.storage.setUser(this._userData);
                    }
                },
                err => console.log(err)
            );
    }
    ngOnInit() {
    }

    goRouth(item :any) {
        this.router.navigateByUrl('/tabs/' + item);

    }

    logout() {
        this.storage.LogedOut();
        this.router.navigateByUrl('/login');
    }

}
