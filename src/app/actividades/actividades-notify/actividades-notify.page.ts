import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController,ToastController, Platform, LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs/Subscription';
import { ActividadesService } from 'src/app/services/actividades.service';
import { RoutesGeo } from 'src/app/models/routesgeo.model';



declare var google;

@Component({
  selector: 'app-actividades-notify',
  templateUrl: './actividades-notify.page.html',
  styleUrls: ['./actividades-notify.page.scss'],
})
export class ActividadesNotifyPage implements OnInit {
  @ViewChild('map',{static:false}) mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  currentMapTrack = null;
 
  isTracking = false;
  trackedRoute = [];
  previousTracks:RoutesGeo[];
  dateRoute:any;
  positionSubscription: Subscription;
  origins;
  destination;
  
  
  constructor(public activitiserv : ActividadesService,
    public navCtrl:NavController,
    private geolocation: Geolocation,
    public toastController : ToastController,
    public plt:Platform,
    private storage:Storage,
    public loadingCtr : LoadingController,
    public loadingController: LoadingController
    ) { }

    showMessage(header, msg) {
      let alert = this.toastController.create({
        message: msg,
        duration: 3000,
        header: header,
        buttons: ['Aceptar']
      });
      alert.then(alert => alert.present());
    }
  

  ngOnInit() {
    this.destination = {lat:18.7910568, lng:-99.2369295};
    this.ionViewDidLoad();
  }

   async ionViewDidLoad() {
    const loading = await this.loadingController.create({
      message: 'Espere por favor..',
      spinner: 'crescent'
    });
    await loading.present();
    this.plt.ready().then(() => {
      this.loadHistoricRoutes();
      
      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.directionsRenderer.setMap(this.map);

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        loading.dismiss();
        this.geolocation.getCurrentPosition().then(pos => {
          //alert("dentro del metodo para sabere cual es el GPS");
          let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          this.origins = {lat: pos.coords.latitude, lng: pos.coords.longitude};
          
          this.map.setCenter(latLng);
          this.map.setZoom(16);
          
          this.addMarker(pos.coords.latitude, pos.coords.longitude, '../assets/mark.png', 'Aqui Estas Tu..');

          this.addMarker(18.7910568,-99.2369295,'../assets/mark.png', 'Donde debes llegar');
          

        }).catch((error) => {
          console.log('Error getting location', error);
        });

        this.calculateRoute();
      });
        
      
      
    });
  }

  loadHistoricRoutes(){
    console.log("dentro del metodo para recu(perar las rutas de el usuario");
    this.activitiserv.loadRoutes().subscribe(data=>{
      this.previousTracks = data;
    }, err=>{
      this.showMessage("Error" , "Error al recuperar la infromacion de las rutas."+err);
    })
  }

  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];
 
    this.isTracking = true;
    this.trackedRoute = [];
    console.log("---------------------------");
    this.positionSubscription = this.geolocation.watchPosition({ enableHighAccuracy : true})
      .pipe()
      .subscribe(data => {
        
        setTimeout(() => {
          let latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
          this.map.setCenter(latLng);
          this.map.setZoom(16);
        this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
        var date = new Date().getTime();
        this.addMarker(data.coords.latitude, data.coords.longitude, '../assets/entre.png', 'Aqui Estas tu');
        
        this.activitiserv.insertGeo(date ,data.coords.latitude, data.coords.longitude).subscribe(data =>{ 
          //alert("-------------");
          //alert(data);
        },err=>{
          alert("ocurrion un error, al reportar tu ubicacion");
          alert(err);
        });
        this.redrawPath(this.trackedRoute);

        
        }
         );
         console.log(data);
      });
 
  }


  addMarker(latitud:number, longitud:number, marcador:string, titulo:string){
    console.log("estamos dentro del metodo para agregar marker");
    const marker = new google.maps.Marker({
      icon: marcador,
      animation: 'DROP',
      map: this.map,
      position:{
        lat: latitud,
        lng: longitud
      },
      title: titulo,
    });

    return marker;
  }

  stopTracking() {
    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    // this.previousTracks.push(newRoute);
    // // this.storage.set('routes', this.previousTracks);
   console.log(this.trackedRoute);
   console.log(new Date().getTime);
    this.dateRoute = new Date().getTime;
    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    this.currentMapTrack.setMap(null);
    
  }
   
  showHistoryRoute(route) {
    this.redrawPath(route);
  }

  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }
 
    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#79D0FE',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

  calculateRoute(){
    alert(this.origins.lat+ "jdnc" + this.origins.lng );
    alert(this.destination.lat + " ----- " + this.destination.lng);
    var request = {
      origins: this.origins,
      destination: this.destination,
      travelMode: 'DRIVING'
    };
    this.directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        this.directionsRenderer.setDirections(result);
      }else{
        alert("no se pudo realizar el pintado de la ruta optima");
      }
    });
    // this.directionsService.route({
      
    // }, (response, status)=>{
    //   alert(response);
    //   alert(google.maps.DirectionsStatus.OK);
    //   this.directionsRenderer.setDirections(response);
    //   if(status === 'OK'){
    //     this.directionsRenderer.setDirections(response);
    //   }else{
    //     alert("no se pudo realizar el pintado de la ruta optima");
    //   }
    // });
  }
 

}
