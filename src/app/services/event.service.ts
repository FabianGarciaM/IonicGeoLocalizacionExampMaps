import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EventsList } from '../models/eventlist.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  //apiURLSchool =  environment.url;
  constructor(private httpClient:HttpClient) { }

  // getAllEvents(Token:any): Observable<EventsList>{
  //   console.log("Dentro de el servico" + Token);
  //   //return this.httpClient.get<EventsList>(this.apiURLSchool+'/Router/msn/listEvents.php',{params:{token: Token}});
  // }

}
