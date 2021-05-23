import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';

import { HomeServiceService } from 'src/app/services/home.service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotifiHome } from 'src/app/models/notifihome.model';

@Component({
  selector: 'app-infhome',
  templateUrl: './infhome.page.html',
  styleUrls: ['./infhome.page.scss'],
})
export class InfhomePage implements OnInit {

  showMessage(header, msg) {
    let alert = this.toastController.create({
      message: msg,
      duration: 3000,
      header: header,
      buttons: ['Aceptar']
    });
    alert.then(alert => alert.present());
  }

  constructor(private storage: Storage,
    private jwtHelper: JwtHelperService, 
    public homeEvents:HomeServiceService,
    public toastController: ToastController) { 

      console.log("entrando al modulo----->");

    }

    Ip:any;
    Token:any;
    IdUsr:any;
    Name:any;
    InfoUsr:any;
    ListaHome:NotifiHome;

  ngOnInit() {
      console.log("dentro del ngInit");
      console.log("Solicitamos la Ip al LocalStorage");
      this.storage.get('DataValidation').then((DataValidation)=>{
        console.log("--------------->" + DataValidation);
        console.log(DataValidation[0].IP);
        this.Ip = DataValidation[0].IP;
        console.log("????????????????");
      });

      console.log("Solicitamos los datos al localstorage del JWT");
      this.storage.get('TokenJWT').then((tokenJWT) => {
        console.log("dentro del metodo para el JWT");
        var data = this.jwtHelper.decodeToken(tokenJWT).data;
        //console.log("Other Dataaaaa----->" + tokenJWT);
        //console.log('Your data is ===---->===========' + data[0].Id);
         this.Token = tokenJWT;
        //console.log("Este es el TOKEN desde listEventssss-->" + this.Token);
         this.IdUsr = data[0].Id;
        console.log("Este es el Id del Usuario en La Lista------->" + this.IdUsr);
         this.Name = data[0].Nombre;
        console.log("Estes es el nombre del Usuario Logeado---->" + this.Name);
         this.InfoUsr = data[0];
        // console.log("recuperamos la lista de las notificaciones...");
        this.getallnotififoUser(this.Ip,this.Token,this.IdUsr);
        console.log("entro al metodo de las notificaciones");
      });
      
      
     
  }


  getallnotififoUser(Ip,Token,Idusr){
    console.log("Solicitamos todas las Notificaciones Pendientes ");
    this.homeEvents.getAllNotifi(Ip,Token,Idusr).subscribe(data =>{
      console.log(data);
      this.ListaHome = data;
    },
    err=>{
      console.log("error al recueprar la infromacion de las Notificaciones");
      console.log(err.error.text)
      if(err.error.text == "No Existe Informaciono para este Usuarionull"){
        this.showMessage("Error" , "No Existe ninguna Notificacion o Recordatorio");
      }else if(err.error.text == "Error al conectarse con el servidor."){
        this.showMessage("Error" , "Error al establecer Conexion con el Servicodo");
      }
    });
  }

  toggleSection(i){
    console.log("-------"+this.ListaHome[i].open);
    this.ListaHome[i].open = !this.ListaHome[i].open;
  }
}
