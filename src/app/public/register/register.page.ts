import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import { FunctionsProvider } from 'src/app/helper/functions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  ionicForm: FormGroup;

  constructor(private _userService:UserService,public router:Router,public functions:FunctionsProvider,
              public formBuilder: FormBuilder) {

    this.ionicForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.email]],
    })
  }

  ngOnInit() {
  }

  register(){
    this._userService.register( this.ionicForm.value)
      .subscribe(
        res => {
          console.log(res)
          // if(res.respcode==1){

            this.router.navigateByUrl('/login')
          //   this.functions.presentToast('Success Registered',FunctionsProvider.SUCCES_TOAST)
          // }else{
          //   this.functions.presentToast(res.respmess,FunctionsProvider.ERROR_TOAST)
          //   console.log(res.resmess)
          // }
        },
        err => {
          this.functions.presentToast(err.statusText,FunctionsProvider.ERROR_TOAST)
        }
      );

  }
}
