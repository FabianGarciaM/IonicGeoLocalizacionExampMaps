import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { EventsList } from '../models/eventlist.model';
import { HttpClient } from '@angular/common/http';
import { Rutas } from '../models/rutas.model';
import { InfoFiles } from '../models/infofile.model';
import { NotifiHome } from '../models/notifihome.model';


@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  apiURLSicas =  environment.url;
  constructor(private httpClient:HttpClient) { }


  getListRutas(Token: any, RutaIni:string, Ip:string) : Observable<Rutas[]>{
    console.log("Este es el Token-->" + Token);
    console.log("Ruta Inicial para oostrar la informacion--->  " + RutaIni);
    //console.log("Entrando a la ruta para recuperar la lista de Rutas");
    //return this.httpClient.get<Rutas[]>(this.apiURLSicas+'/appSiks/ListRutas.php', {params:{token:Token, rutaini:RutaIni}});
    return this.httpClient.get<Rutas[]>('http://'+Ip+'/AppSicas/ListRutas.php', {params:{token:Token, rutaini:RutaIni}});

  }
  getComplementRutas(Token:any, NewRuta:string , Ip:string) : Observable<Rutas[]>{
    //console.log("Entrando el metodo para recuperar el resto de las rutas");
    //console.log("Este es el Token ---> " + Token + "  esta es la Nueva ruta a consultar  " + NewRuta);
    return this.httpClient.get<Rutas[]>('http://'+Ip+ '/AppSicas/ListRutas.php', {params:{rutaini:NewRuta}});
  }
  getInformationFile(Token:any, NameFile, Ip:string) : Observable<InfoFiles[]>{
    //console.log("------Traer data de el archivo seleccionado-------");
    //console.log("Nombre del archivo a buscar sus moviementos..." + NameFile + "   TOKEN   " + Token);
    return this.httpClient.get<InfoFiles[]>('http://'+ Ip + '/AppSicas/InfoFails.php', {params:{token:Token, NameFile:NameFile}});
    
  }

  createnewDir(Ip:string,Type:string, RutaDestino:string, Name:string){
    return this.httpClient.get<string>('http://'+ Ip + '/AppSicas/CreateFileorDir.php',{params:{type:Type, destino:RutaDestino, name:Name}});
  }


  deleteFilesorDir(Ip:string, typeoper:string, Type:string, Destino:string, Name:string){
    return this.httpClient.get<string>('http://'+ Ip + '/AppSicas/CRUDFiles.php', {params:{TypeOper:typeoper, type:Type, destino:Destino, name:Name}});
  }

  //----------------------------------TAB de Notificaciones-------------------------------------------
  getAllNotifi(Ip:any,Token:any, IdUser:any) : Observable<NotifiHome>{
    console.log("este es el token que con el que se valida la autenticidad de la solicitud");
    //console.log(Token);
    console.log("Este es el Id del Usuario Solicitante");
    console.log(IdUser);
    return this.httpClient.get<NotifiHome>('http://'+Ip+'/AppSicas/NotifyUsers.php',  {params:{token:Token, Id:IdUser}});
  }

}
