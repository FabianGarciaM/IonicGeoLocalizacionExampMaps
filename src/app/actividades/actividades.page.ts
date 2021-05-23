import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  IdUsr:number;
  NameUsr:string;
  InfoUser:string;
  see:boolean = false;

  constructor(
    private storage: Storage,                                          
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit() {
    console.log("hola como estaaaaaa------------->");
    this.storage.get('TokenJWT').then((TokenJWT) => {
      console.log(TokenJWT);
      var data = this.jwtHelper.decodeToken(TokenJWT).data; 
     
       this.IdUsr = data[0].Id;
     //this.infoUser = data[0];
       this.NameUsr = data[0].Name;
       this.InfoUser = data[0];
       if(this.IdUsr != null || this.IdUsr != undefined){
        this.see=false;
       }else{
         this.see = true;
       }
       console.log('Your data is ==============' + 
       this.IdUsr, + "*/*/*/*/*" + 
       this.NameUsr + "-------------"+ 
       this.InfoUser);
    });
  }



}
