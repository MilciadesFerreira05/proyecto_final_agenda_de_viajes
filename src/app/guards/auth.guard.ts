
import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot, UrlTree } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { UtilsService } from "../services/utils.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  //injectar los servicios
  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let user = localStorage.getItem('user'); //crear una variable para verificar si existe en localStorage (localmente el usuario)
    
    return new Promise((resolve) => { //retornar una nueva promesa

      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => { //retornar la funcion get auth y el metodo 'onAuthStateChanged' que nos permite saber si el usuario esta logueado

        if(auth) {
          if(user) resolve(true);
        }
        else {
          this.utilsSvc.routerLink('/auth');
          resolve(false);
        }
       })
    });

  }


}

