import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';
import { LoadingController } from '@ionic/angular';

import { environment } from '../../environments/environment.prod';
import { tap,map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { VerifyLogin } from '../models/verifylogin.model';
//import 'rxjs/add/operator/map';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  

  authState = new BehaviorSubject(false);
  url = environment.url;
  islogin:number = 0;
  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    public loadingController: LoadingController
    
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }
 
  ifLoggedIn() {
    this.storage.get('TokenJWT').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }
   

  VerifyData(credentials): Observable<VerifyLogin[]>{
    //console.log("dentro del servicio que nos regresa la informacion de Ip de server y Si ya Pago");
    return this.httpClient.post<VerifyLogin[]>('https://www.teamsdk.com/appSiks/VerifyStatus.php', credentials);
  }



login(credentials, IP) {

      console.log(credentials);
      //alert(credentials.password);
      //alert(credentials.tokenFirebase);
      //alert("FCM"+credentials.tokenFirebase);
      console.log(IP);
      
       //return this.httpClient.post('https://www.teamsdk.com/appSiks/Login.php', credentials).pipe(catchError(err => {
      this.httpClient.post('http://' + IP + '/AppSicas/Login.php', credentials).pipe(catchError(err => {
            //alert(err);
            //this.showMessage("Error de Conecxion", "Esta cuenta se encuentra sociada a otro dispositivo, favor de ponerse en contacto con el Administrador");
            //alert(  err  );
            //alert(err.message);
            //alert(err.error.text);
            // console.log(err.ok);
            //this.decodeDataFromToken(err.error.text);
            if(err.ok == false && err.message == 'Http failure during parsing for http://'+IP+'/AppSicas/Login.php'){
              this.showMessage("Error Login" , "Usuario y/o Contraseña Incorrectos o Usuario esta Ligado a un Celular ya existente, Favor de Validar Informacion");
              return err;
            }
            throw new Error(err);
            })).subscribe(res => {
              //console.log("-----------Datos Recuperados desde MySchool para saber a donde logearnos");
              
                var data =  this.decodeDataFromToken(res);
                //console.log("----------------************" + res );                                                                                                                      
                //console.log("-------------------------------------***" + data[0]);
                                                                                                 
                if( data[0] ){
                  this.storage.set('TokenJWT', res ).then((response) => {
                    
                  this.router.navigate(['home']);
                  this.authState.next(true);
                  //alert(response);
                  return response;
                });
                  
                }else{
                  this.showMessage("Error Login" , "Usuario y/o Contraseña Incorrectos");
                  return this.islogin = 0;
                }
                console.log("este es el valor de islogin----->" + this.islogin);  
            });      
            // console.log("este es el valor de islogin----->" + this.islogin);
            // if(this.islogin == 1){
            //   return 1;
            // }else{
            //   return 0; 
            // }                                                                       
  }// FIN login(credentials) 

   decodeDataFromToken(token) {
    return this.jwtHelper.decodeToken(token).data;
  }

  logout() {
    this.storage.remove('TokenJWT').then(() => {
      console.log("entrando al metodo para deslogearnos---");
      this.router.navigate(['login']);      
      this.authState.next(false);
      this.router.navigate(['login']);   
      this.showMessage("" ,"Deslogueado");
    });
  }
 
  isAuthenticated() {
    return this.authState.value;
  }
 
 showMessage(header, msg) {
    let alert = this.toastController.create({
      message: msg,
      duration: 3000,
      header: header,
      buttons: ['Aceptar']
    });
    alert.then(alert => alert.present());
  }
 
}