import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { MatTreeModule } from '@angular/material/tree';
import { EventsList } from 'src/app/models/eventlist.model';
import { EventService } from 'src/app/services/event.service';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-lista-notify',
  templateUrl: './lista-notify.page.html',
  styleUrls: ['./lista-notify.page.scss'],
  
})
export class ListaNotifyPage implements OnInit {
  Token:any;
  IdUsr:number;
  Name:string;
  InfoUsr:string;
  ListEvents:EventsList;
  constructor(private event:EventService,
    private storage: Storage,                                          
    private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    this.storage.get('TokenJWT').then((tokenJWT) => {

      var data = this.jwtHelper.decodeToken(tokenJWT).data;
     console.log('Your data is ==============' + data[0].id);
       this.Token = tokenJWT;
       console.log("Este es el TOKEN desde listEventssss-->" + this.Token);
       this.IdUsr = data[0].id;
        console.log("Este es el Id del Usuario en La Lista------->" + this.IdUsr);
       this.Name = data[0].id;
        console.log("Estes es el nombre del Usuario Logeado---->" + this.Name);
       this.InfoUsr = data[0];
       //this.getAllListEvents(this.Token);
    });



    
  }

 

  // getAllListEvents(Token:any){
  //   console.log("***********LISTA DE EVENTOS***********");
  //   this.event.getAllEvents(Token).subscribe(data=>{ 
  //     console.log(data);
  //       this.ListEvents = data;

  //   },err=>console.log( err))
  // }


  toggleSection(i){
    console.log("-------"+this.ListEvents[i].open);
    this.ListEvents[i].open = !this.ListEvents[i].open;
  }


  // actualizaList(){
  //   this.getAllListEvents(this.Token);
  // }


}
