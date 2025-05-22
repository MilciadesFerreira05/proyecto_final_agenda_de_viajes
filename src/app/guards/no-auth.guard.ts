
import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot, UrlTree } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { UtilsService } from "../services/utils.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class NoAuthGuard implements CanActivate {

  //injectar los servicios
  firebaseSvc = inject(FirebaseService)
  utilsSvc = inject(UtilsService)

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    
    return new Promise((resolve) => { //retornar una nueva promesa

      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => { //retornar la funcion get auth y el metodo 'onAuthStateChanged' que nos permite saber si el usuario esta logueado

        if (!auth) resolve(true);

        else {
          this.utilsSvc.routerLink('/main/home');
          resolve(false);
        }
       })
    });

  }


}

