import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  IdUsr:number;
  NameUsr:string;
  InfoUser:string;

  constructor(
    private storage: Storage,                                          
    private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    console.log("hola como estaaaaaa------------->");
    this.storage.get('TokenJWT').then((TokenJWT) => {
      console.log(TokenJWT);
      var data = this.jwtHelper.decodeToken(TokenJWT).data; 
     
       this.IdUsr = data[0].Id;
     //this.infoUser = data[0];
       this.NameUsr = data[0].Name;
       this.InfoUser = data[0];
       console.log('Your data is ==============' + this.IdUsr, + "*/*/*/*/*" + this.NameUsr + "-------------"+ this.InfoUser);
    });
  }

}
