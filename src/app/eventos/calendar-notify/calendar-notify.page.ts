
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';

import { HttpClient } from '@angular/common/http';  

import { Evento } from '../../models/evento.model';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-calendar-notify',
  templateUrl: './calendar-notify.page.html',
  styleUrls: ['./calendar-notify.page.scss'],
})
export class CalendarNotifyPage implements OnInit {

  event = {
    title: '',
    desc2: '',
    //descripcion: 'descripcion default',
    startTime: '',
    endTime: '',
    allDay: false
  };
 



  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 collapseCard =true;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
   //   locale: 'en-GB'
  };

ListaEventos:Evento[]; 
  @ViewChild( CalendarComponent, {static: true})   myCal: CalendarComponent;
 
  constructor(private alertCtrl: AlertController
              , @Inject(LOCALE_ID) private locale: string
              ,private httpClient: HttpClient
              , private storage: Storage
              
              ) { 
                this.MesAnterior = new Date();
    
      
  }
 

  Token;
  ngOnInit() {

    this.storage.get('TokenJWT').then((tokenJWT) => {
      this.Token = tokenJWT;   
      console.log("Calendar ==========  "  +  this.Token);   
      this.resetEvent();
    }); 

 
   // this.myCal.locale ="en-GB";
  //console.log("====================================== uccccccccccccccc" + this.myCal.currentDate );
    
  }
 
  resetEvent() {
    this.event = {
      title: '',
      desc2: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc2: this.event.desc2
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
    this.eventSource = [];
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }


  onRangeChanged (event) {
      
      console.log("----------------------" +event.endTime);

  }


  startDateTime : Date;
  endDateTime : Date;
apiURLSchool = "https://myschoolnotify.com";
direccion="MismoMes"
// Change current month/week/day
next() {

  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slideNext();
}     

back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();

}

 
// Change between month/week/day
changeMode(mode) {
  this.calendar.mode = mode;

}
 
MesAnterior:Date;
// Focus today
today() {
  this.MesAnterior = this.calendar.currentDate = new Date();

}
 
// Selected date reange and hence title changed
async onViewTitleChanged(title) {
  
  this.viewTitle = title;
//this.viewTitle  =  await translate(title);
}
 
async onCurrentDateChanged(event){
   var currentDate = new Date(this.myCal.currentDate);

  console.log("******************  this.MesAnterior.getMonth()       = " + this.MesAnterior       );
  console.log("******************  this.myCal.currentDate.getMonth() = " + this.myCal.currentDate );
  console.log("===================================================================" +  ( this.MesAnterior.getMonth() - this.myCal.currentDate.getMonth() ));
var difMonths =  this.myCal.currentDate.getMonth() -  this.MesAnterior.getMonth() ;

this.GetEventByDay( -1, 1 , 24,13  );

this.MesAnterior = this.myCal.currentDate;

  this.myCal.loadEvents();
  
}


GetEventByDay( monthMenos, monthMas , diasMenos, diasMas ){

  if(this.Token == undefined)
    return;


  this.direccion = "MesAnterior";  


  this.startDateTime =  new Date(this.myCal.currentDate);
  this.endDateTime =  new Date(this.myCal.currentDate);
 this.startDateTime.setMonth(this.myCal.currentDate.getUTCMonth() + monthMenos);
  this.endDateTime.setMonth(this.myCal.currentDate.getUTCMonth() + monthMas ) ;
  this.startDateTime = new Date( this.startDateTime.getUTCFullYear(),  this.startDateTime.getUTCMonth(), diasMenos );
  this.endDateTime = new Date( this.endDateTime.getUTCFullYear(),  this.endDateTime.getUTCMonth(),diasMas );

  var stringStartDateTime= this.startDateTime;
  var stringEndDateTime  = this.startDateTime;

  console.log("**************************************************** = -- " + formatDate (this.startDateTime ,"yyyy-MM-dd" ,"en-US") );
  console.log("**************************************************** = --" + formatDate (this.endDateTime   ,"yyyy-MM-dd" ,"en-US")  );
 console.log( "--------------------------- GetEventByDay ================  " + this.Token );
  //this.httpClient.get( this.apiURLSchool + '/Router/msn/GetEventByDay.php'
  this.httpClient.get( this.apiURLSchool + '/Router/msn/GetEventByUserId.php'
  

                      ,{
                            params: { 
                                      StartDateTime :  formatDate (this.startDateTime ,"yyyy-MM-dd" ,"en-US"), 
                                      EndDateTime   :  formatDate (this.endDateTime   ,"yyyy-MM-dd" ,"en-US") ,
                                      Token:  this.Token
                                     }
                        }).subscribe(data =>{

                                        if (data==null)
                                           return;
                                           // console.log("DATATADFADFADFADFADDADADAD   ==  " + data);
                                              this.ListaEventos = <Evento[]>data;
                                              this.eventSource = [];
                                              this.ListaEventos .forEach(evento => {
                                                                                        let eventCopy = {
                                                                                                                    title     : evento.title ,                                                     
                                                                                                          startTime : new Date( evento.start ) ,
                                                                                                          endTime   : new Date( evento.end ) ,             
                                                                                                          allDay    : false ,
                                                                                                          tipoEvento : evento.Evento,
                                                                                                          EventIcon : evento.EventIcon,
                                                                                                          color:evento.color,
                                                                                                          LugarEvento:      evento.LugarEvento
                                                                                                        }

                                                                                        this.eventSource.push( eventCopy );
                                                                                        this.myCal.loadEvents();                         
                                                                                    });
                                            });
}



// Calendar event was clicked
async onEventSelected(event) {
  // Use Angular date pipe for conversion
  let start = formatDate(event.startTime, 'medium', this.locale);
  let end = formatDate(event.endTime, 'medium', this.locale);
 
  
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: event.desc2,
    message: 'De : ' + start 
             + '<br><br>A : ' + end              
    ,buttons: ['Aceptar']
  });
  alert.present();
}
 
// Time slot was clicked
onTimeSelected(ev) {
  let selected = new Date(ev.selectedTime);
  // console.log("============================ ev.selectedTime = "  +  ev.selectedTime);
  // console.log("============================ selected        = "  +  ev.selectedTime) ;

  //console.log( new Date( moment().format() ) ) ;

  this.event.startTime = selected.toISOString();
  selected.setHours(selected.getHours() + 1);
  this.event.endTime = (selected.toISOString());
}


}
