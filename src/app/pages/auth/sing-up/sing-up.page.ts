import { Component, inject, OnInit } from '@angular/core';
import { t } from '@angular/core/weak_ref.d-Bp6cSy-X';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
  standalone: false
})
export class SingUpPage implements OnInit {

  constructor() { }


  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  })


  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilSvc.loading();
      await loading.present();

      this.firebaseSvc.singUp(this.form.value as User).then(async res => {

        await this.firebaseSvc.updateUser(this.form.value.name);

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid); //funcion para guardar en la base de datos (se creo mas abajo)

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

  async setUserInfo(uid: string) { //recibe el uid para guardar en la BD
    if (this.form.valid) {

      const loading = await this.utilSvc.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password;

      this.firebaseSvc.setDocument(path, this.form.value).then(async res => {

  
        this.utilSvc.saveInLocalStorage('user', this.form.value);
        this.utilSvc.routerLink('/main/home'); //enrutar para el home al loguearse
        this.form.reset();

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




