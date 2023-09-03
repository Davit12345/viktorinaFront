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
          if(res.respcode){
            this.storage.LogedIn(res.data);
            this.router.navigateByUrl('/tabs/categories')
          }else{
            this.functions.presentToast(res.respmess,FunctionsProvider.ERROR_TOAST)
          }        },
        err => console.log(err)
      );
    this._userService.login(
        // request params
      this.ionicForm.value,
        // callback
    );
  }
}
