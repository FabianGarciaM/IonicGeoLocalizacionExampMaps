import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.model';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  
    apiURLSchool = environment.url;

    constructor(
                private httpClient: HttpClient) {}

    getEscuelabyUser(iduser:number) : Observable<Menu[]>{
        return this.httpClient.get<Menu[]>(this.apiURLSchool+ '/Router/msn/allDatabyUser.php/?usr='+iduser);
    }

}
