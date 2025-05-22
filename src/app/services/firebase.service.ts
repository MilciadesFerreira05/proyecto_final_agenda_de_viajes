import { inject, Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user.model';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, getDoc, doc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  // ======================= Autenticacion ===================
getAuth() {
    return getAuth();
  }

  // ========Acceder============
  singIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // ========Crear Usuario============
  singUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // ========Actualizar Usuario============
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  // ========Enviar email para restablecer Contraseña============
  sendReciveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }
 
  // ======== Cerra Sesion ============

singOut() {
  getAuth().signOut();
  localStorage.removeItem('user'); //cerrar sesion completamente sacando de localStorage el usuario 
  this.utilsSvc.routerLink('/auth');
}


  // ====================== Base de Datos ====================

  // ======== Setear un Documento ==========
  setDocument(path: string, date: any) {
    return setDoc(doc(getFirestore(), path), date);
  }

  // ======== Obtener un Documento ==========
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

}
