import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  


   user_name ;
   id ;
  constructor( private authService: AuthenticationService,
               private storage: Storage,
               
    ) {

      this.storage.get('USER_INFO').then((response) => {
        if (response) {
          
            // console.log("=============================" + response);
            
             this.user_name = response[0].username; 
             this.id = response[0].id;
            
        }
      });

     }

  ngOnInit() {
    this.authService.logout();
  }
  
}
