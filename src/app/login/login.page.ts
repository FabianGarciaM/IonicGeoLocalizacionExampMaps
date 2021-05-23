import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FCM } from '@ionic-native/fcm/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { LoadingController } from '@ionic/angular';

import { ToastController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { VerifyLogin } from '../models/verifylogin.model';
import * as shajs from 'sha.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showMessage(header, msg) {
    let alert = this.toastController.create({
      message: msg,
      duration: 3000,
      header: header,
      buttons: ['Aceptar']
    });
    alert.then(alert => alert.present());
  }

  credentialsForm: FormGroup;
  FirebaseToken:string;
  UD_ID:string;
  Data:VerifyLogin[] = [];
  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private fcm:FCM,
              private uniqueDeviceID: UniqueDeviceID,
              public toastController: ToastController,
              public platform: Platform,
              private jwtHelper: JwtHelperService,
              private storage : Storage,
              public loadingController: LoadingController
              ) { 
                 
                this.credentialsForm = this.formBuilder.group({
                  user: ['', [Validators.required, Validators.minLength(1)]],
                  password: ['', [Validators.required, Validators.minLength(1)]],
                  //uid:'f31d8a7d-3e8a-d962-8695-910323954348',
                  //tokenFirebase : 'emBxDJl89Ds:APA91bGnZUYbG9V2dhQKenUZhipHf-ghEmRG2Lg-aoUSoVUengGSe3WEVpXbEYj06atrSFfZ1AC4s2oX_3FNayrYh_B6GxP8WxSJBpyv7kJrR3CS-SZaVnCq91eKd5DCILpgKRIcJHx8'
                  
                  uid:this.UD_ID,
                  tokenFirebase : this.FirebaseToken
            
                });
              }

  ngOnInit() {
    this.platform.ready().then(()=>{

      //Recuperacion de el tokem de firebase
      this.fcm.getToken().then((TFMToken:string)=>{
        //console.log("Este es el token para el telefono desde Login------>" + TFMToken);
        this.FirebaseToken = TFMToken;
        //console.log("Este es el TOKEN desde LOGIN en Variable------>" + this.FirebaseToken);
      // this.showMessage( "getToken",  this.FirebaseToken)
    

      }).catch(err =>{
        console.log("error al generar el token" + err);
      });

      //si existe una actualizacion de el TOKEN , al subscribirnos a este metodo nos notificara que se actualizo dicho TOKEN
      this.fcm.onTokenRefresh().subscribe((token:string)=>{
        //console.log("actualizacion de token desde Login--->" + token);                    
        //console.log("Actualizado desde LOGIN  -->" + token);
      //  this.showMessage( "onTokenRefresh" , token);

        this.credentialsForm.value.tokenFirebase = token;


      });
      //creamos el UID para la palicacion
      this.uniqueDeviceID.get()
      .then((uuid: any) => {
        //console.log("UID : " + uuid);
        this.UD_ID = uuid
        
        //this.showMessage( "uniqueDeviceID" , uuid);
      })
      .catch((error: any) => {
        //console.log("UIDERR : " + error); 
        this.showMessage("err", error);
        //intentamos de nuevo agregar un Unique ID
          this.uniqueDeviceID.get().then((uuid: any)=>{
              //console.log("intento 2 UID  : " + uuid);
              this.UD_ID = uuid;
              //this.showMessage("Intento 2 UID" , uuid);
          }).catch((err: any)=>{
            //console.log("UID -- ERR" + err);
            //this.showMessage("inento 2 fallido-" , err);
          });
      });

      //Realizamos una peticion a la base de datos de MyschoolNotify para poder saber la ruta al server
      this.authService.VerifyData(this.credentialsForm.value).subscribe(data =>{
        //console.log(data);
        var dataDes =  this.decodeDataFromToken(data);
        //console.log(dataDes);
        this.Data = dataDes;
        this.storage.set('DataValidation', dataDes ).then((response) => {
            //console.log(response);
            //console.log("los datos en storage");
        });
        //console.log(this.Data);
        //console.log("*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/");
      },err=>{
        console.log("Error al recuperar la informacion  de la IP-----> ");
        console.log(err);
      })

    });
   
  }

  decodeDataFromToken(token) {
    return this.jwtHelper.decodeToken(token).data;
  }

  

async loginUser(){
    var login
    var password;
    this.credentialsForm.value.tokenFirebase = this.FirebaseToken;
    this.credentialsForm.value.uid = this.UD_ID;
    // var password = this.credentialsForm.value.password;
    // this.credentialsForm.value.password = shajs('sha256').update({password}).digest('hex');
    // console.log("contraseña encriptada ------------------> " + this.credentialsForm.value.password);
    console.log("-----------Datos Recuperados desde MySchool para saber a donde logearnos");
    const loading = await this.loadingController.create({
      message: 'Autenticando..',
      spinner: 'crescent',
      duration: 2000
    });
    await loading.present();

    this.storage.get('DataValidation').then((DataValidation)=>{
      //console.log(DataValidation);
      // var data = this.jwtHelper.decodeToken(DataValidation).data;
      // console.log(data[0].IP);
      // console.log(data[0].Status);
      var ip = DataValidation[0].IP;
      var status = DataValidation[0].Status;
      
      console.log("antes de entrar al if");
        if(status == "Alive"){
          //alert("Entrando al metodo para logearnos");
          //console.log("metodo para mostrar al loading");
         
          login = this.authService.login(this.credentialsForm.value, ip);
          //console.log("este es el regreso del login ---->    ");
          //console.log(login);
        //   if(login == 1){
        //     loading.dismiss();
        //     //this.showMessage("Acceso" , "Usuario y/o Contraseña invalidos, porfavor valida la informacion" + login);
        //   }else{
        //     loading.dismiss();
        //     //this.showMessage("Acceso Denegado" , "Usuario y/o Contraseña invalidos, porfavor valida la informacion" + login);
        //  }
        }else{
          this.showMessage("Acceso Denegado" , "Por Favor ponerse en contacto con TeamSDK, para mas Informacion");
        } 
    });
    
      
  }


  async presentLoading(mensaje:string) {
    console.log("metodo para mostrar al loading");
    const loading = await this.loadingController.create({
      message: mensaje,
      //duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
}
 