import { Component, OnInit } from '@angular/core';
import { NavController,ToastController, Platform } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs-compat/Subscription';
import { Observable } from 'rxjs';
import { ActividadesService } from 'src/app/services/actividades.service';


@Component({
  selector: 'app-traking',
  templateUrl: './traking.page.html',
  styleUrls: ['./traking.page.scss'],
})
export class TrakingPage implements OnInit {

  constructor(
    public navCtrl: NavController, 
    public geolocation:Geolocation,
    public toastController:ToastController,
    private plt:Platform,
    public activitiserv:ActividadesService) { }

    lat:number
    lon:number
    total:string
    isTracking = false;
    watch:Observable<Geoposition>;
    dateRoute:any;
    positionSubscription: Subscription;

  ngOnInit() {
    this.getGeolocation();
  }


  getGeolocation(){
    console.log("entrando al meteodo para recuperar los datos de geo");
    var options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };
    this.geolocation.getCurrentPosition(options).then((geoposition: Geoposition)=>{
      console.log(geoposition.coords.latitude);
      console.log(geoposition.coords.longitude);
      geoposition.coords.latitude;
      geoposition.coords.longitude;
    }, err =>{
      alert("error --> " + err);
      console.log(' Error : ' + JSON.stringify(err));
    });
  }

  startTracking() {
    this.isTracking = true;

    console.log("---------------------------");
    this.positionSubscription = this.geolocation.watchPosition({ enableHighAccuracy : true})
      .pipe()
      .subscribe(data => {
        setTimeout(() => {
        //var date = new Date(new Date().getTime()- 1000 * 60 * 60 * 8);
        var date = new Date().toISOString();
        alert("esta es la fecha");
        alert(date);
        this.lat = data.coords.latitude;
        this.lon = data.coords.longitude;
          this.activitiserv.insertGeo(date ,data.coords.latitude, data.coords.longitude).subscribe(data =>{ 
            //alert("-------------");
            //alert(data);
          },err=>{
            alert("ocurrion un error");
            alert(err);
          });
        }
         );
         console.log(data);
      });
 
  }

  stopTracking() {
   console.log(new Date().getTime);
    this.dateRoute = new Date().getTime;
    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    //this.currentMapTrack.setMap(null);
    
  }
    

}
