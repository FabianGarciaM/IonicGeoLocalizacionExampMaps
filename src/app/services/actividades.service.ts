import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsList } from '../models/eventlist.model';
import { HttpClient } from '@angular/common/http';
import { Rutas } from '../models/rutas.model';
import { InfoFiles } from '../models/infofile.model';
import { NotifiHome } from '../models/notifihome.model';
import { RoutesGeo } from '../models/routesgeo.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private httpClient:HttpClient) { }

  insertGeo(Date:any, latitude:any, longitud:any){
    console.log("estamos dentro del metodo para Insertar GEO");
    return this.httpClient.get<string>('https://www.teamsdk.com/AppS/InsertGPS.php', {params:{lat:latitude, lng:longitud, date:Date}})
  }

  loadRoutes():Observable<RoutesGeo[]>{
    return this.httpClient.get<RoutesGeo[]>('https://www.teamsdk.com/AppS/HistoryGeo.php')
  }
}
