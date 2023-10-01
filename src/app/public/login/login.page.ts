import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FunctionsProvider} from '../../helper/functions';
import {Router} from '@angular/router';
import {StorageProvider} from '../../providers/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    ionicForm: FormGroup;

  constructor(private _userService:UserService,public functions:FunctionsProvider,
              public formBuilder: FormBuilder,public router:Router,public  storage:StorageProvider) {

      this.ionicForm = this.formBuilder.group({
          username: ['', [Validators.required]],
          password: ['', [Validators.required]],
      })
  }

  ngOnInit() {
  }

  login(){

    this._userService.login(   this.ionicForm.value)
      .subscribe(
        res => {
                    console.log(res)
            this.storage.LogedIn(res.user);
            this.router.navigateByUrl('/tabs/categories')

          },
        err =>  this.functions.presentToast(err?.errors?.User.toString() || 'User not found',FunctionsProvider.ERROR_TOAST)
      );

  }
}
