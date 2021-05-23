import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardService } from './services/login-guard.service';


import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { NgCalendarModule  } from 'ionic2-calendar';
import { LOCALE_ID } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

import localeMX from '@angular/common/locales/es-MX';
import localeMXExtra from '@angular/common/locales/extra/es-MX';
import { registerLocaleData } from '@angular/common';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Push } from '@ionic-native/push/ngx';

import { MenuService } from './services/menu.service';
import { EventService } from './services/event.service';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';

export function tokenGetter() {
  return localStorage.getItem('token');
}
registerLocaleData(localeMX, 'es-MX', localeMXExtra);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    NgCalendarModule,
    NgxQRCodeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ['localhost:3000', 'localhost:4200']
      }
    }),
    
    
  ],

  providers: [
    StatusBar,
    SplashScreen,
    AuthGuardService,
    AuthenticationService,
    LoginGuardService,
    MenuService,
    EventService,
    UniqueDeviceID,    
    SplashScreen,
    CallNumber,
    FCM,
    BarcodeScanner,
    LocalNotifications,
    File,
    FileTransfer,
    FileTransferObject,
    DocumentViewer,
    FileOpener,
    Geolocation,
    {provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
