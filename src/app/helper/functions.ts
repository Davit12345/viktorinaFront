import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class FunctionsProvider{

    static SUCCES_TOAST='success-toast';
    static ERROR_TOAST='error-toast';
    static INFO_TOAST='info-toast';
    constructor(private toastController: ToastController) {

    }
    async presentToast(msg:any,css=FunctionsProvider.SUCCES_TOAST,time=3000) {

        const toast = await this.toastController.create({
            message: msg,
            duration: time,
            cssClass: css,
            buttons: [
                {
                    text: 'Dismiss',
                    role: 'cancel'
                }
            ],
        });

        await toast.present();
    }

      Toast(){
        // this.toast.show(`I'm a toast`, '5000', 'center').subscribe(
        //     toast => {
        //         console.log(toast);
        //     }
        // );


    }



}
