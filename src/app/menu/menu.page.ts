import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, ActivatedRoute } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Menu } from '../models/menu.model';
import { MenuService } from '../services/menu.service';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

 
  selectedPath = '';
//arreglo page todas las rutas de nuestro menu lateral, la rutas reales estan en menu.module
  pages = [
    {
      title: 'Inicio',
      icon: 'home',
      url: '/menu/home',
      color: '#6694FF'
    },  
    {
      title: 'Actividades',
      icon: 'clipboard',
      url: '/menu/actividades',
      color: '#6694FF'
    }
    //,
    // {
    //   title: 'Eventos',
    //   icon: 'information-circle',
    //   url: '/menu/events',
    //   color: 'darkgray'
    // }
  ];



  idUsr:number;
  ListInfoUsr:Menu[];
  NumeroSchool:string;
  Logo:string;
  scannedCode = null;
  infoUser;
  name;

  imgEmpre:string;
  constructor(private callNumber: CallNumber,
              private router: Router, 
              private route: ActivatedRoute,
              private menuService : MenuService,
              private authService: AuthenticationService,
              private barcodeScanner : BarcodeScanner,

              private storage: Storage,                                          
              private jwtHelper: JwtHelperService,
              
              ) { 

                

              this.router.events.subscribe((event: RouterEvent) => {
                if (event && event.url) {
                  this.selectedPath = event.url;
                }
    });

  
    //recuperando los parametros mandados desde el Login
    // this.route.queryParams.subscribe(params=>{
    //   this.idUsr = params.IdUsuario;
    //   console.log("parametros -->" +this.idUsr);
    // });


  }

  ngOnInit() {
   
    this.storage.get('TokenJWT').then((tokenJWT) => {

      var data = this.jwtHelper.decodeToken(tokenJWT).data;
     console.log('Your data is ==============' + data[0].id);
       this.idUsr = data[0].id;
     //this.infoUser = data[0];
       this.name = data[0].id;
     this.getAllEscuelaforUser();
       this.infoUser = data[0];
    });
  }

  logoutUser(){
    this.authService.logout();
  }

  getAllEscuelaforUser(){

    console.log("dentro de el metodo que nos da la escuela y alumnos");
    // this.menuService.getEscuelabyUser(this.idUsr).subscribe(
    //                                                 data=>{
    //                                                           console.log(data);
    //                                                           this.ListInfoUsr = data;
    //                                                           // for(let data of this.ListInfoUsr){
    //                                                           //   console.log("Este es el numero de la escuela---->" + data.Telefono);
    //                                                           //   this.NumeroSchool = data.Telefono;
    //                                                           //   this.Logo = 'http://www.myschoolnotify.com'+data.LogoEscuela+'';
    //                                                           // }
    //                                               }, 
    //                                               err =>
    //                                                 console.log("error al recuperar la informacion" + err)
    //      );

  }


  callSchool(){
    console.log("numero--->" + this.NumeroSchool);
    this.callNumber.callNumber('5581650295',true).then(() =>{
      alert("worked :)");
    }).catch(err=>{
      alert(JSON.stringify(err))
    })
  }

  createQR(){
    console.log("Hola como esta");
    this.barcodeScanner.scan().then(barcodeData =>{
      this.scannedCode = barcodeData.text;
    });
  }


}
