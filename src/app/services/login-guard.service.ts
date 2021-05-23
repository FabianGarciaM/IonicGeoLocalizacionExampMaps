import { Injectable } from '@angular/core';

import {CanActivate} from '@angular/router';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ToastController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
  
  showMessage(header, msg) {
    let alert = this.toastController.create({
      message: msg,
      duration: 3000,
      header: header,
      buttons: [{
                    icon: 'start',
                    text: 'Aceptar',
                    handler: ()=>{
                      this.router.navigate(['/dashboard']);
                    }
                },{
                    icon: 'end',
                    text: 'Cancelar',
                    handler: ()=>{
                      this.router.navigate(['/home']);
                    }
                }
               ]
    });
    alert.then(alert => alert.present());
  }

  constructor(private router: Router, 
              private authService: AuthenticationService,
              public toastController: ToastController) { }

  canActivate(): boolean {
    if(this.authService.isAuthenticated()){
        this.showMessage( "Quieres Salir de la Aplicacion?..." , " ");
        return false;
    }
    return true;
}
}
