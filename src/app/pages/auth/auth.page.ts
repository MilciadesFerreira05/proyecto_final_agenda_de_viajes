import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })


firebaseSvc = inject(FirebaseService);
utilSvc= inject(UtilsService);

  ngOnInit() {
  }

  async submit(){
    if (this.form.valid) {

      const loading = await this.utilSvc.loading();
      await loading.present();

      this.firebaseSvc.singIn(this.form.value as User).then( res =>{


      this.getUserInfo(res.user.uid);

    }).catch( error => {
      console.log(error);

      this.utilSvc.presentToast({
        message: error.message,
        duration: 1500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'
      })

    }).finally(() => {
        loading.dismiss();
    })
    
    }
  }

  async getUserInfo(uid: string) { //recibe el uid para guardar en la BD
    if (this.form.valid) {

      const loading = await this.utilSvc.loading();
      await loading.present();

      let path = `users/${uid}`;
     
      this.firebaseSvc.getDocument(path).then((user: User ) => {
  
        this.utilSvc.saveInLocalStorage('user', user);
        this.utilSvc.routerLink('/main/home'); //enrutar para el home al loguearse
        this.form.reset();

        //Mostrar un toast de bienvenidad al usuario 
          this.utilSvc.presentToast({
          message: `Te damos la bienvenida ${user.name}`,
          duration: 1500,
          cssClass: 'toast-verde',
          position: 'middle',
          icon: 'person-circle-outleine'
        })

      }).catch(error => {
        console.log(error);

        this.utilSvc.presentToast({
          message: error.message,
          duration: 1500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loading.dismiss();
      })

    }
  }

}
