import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
//import {FlatTreeControl} from '@angular/cdk/tree';
//import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

import { EventsList } from 'src/app/models/eventlist.model';
import { HomeServiceService } from 'src/app/services/home.service.service';
import { Rutas } from 'src/app/models/rutas.model';
import { ChildsFile } from 'src/app/models/childfile.model';
import { InfoFiles } from 'src/app/models/infofile.model';
import { RegresoRuta } from 'src/app/models/regregosruta.model';
import { UpdatePage } from 'src/app/modals/modalupdate/update/update.page'; 

import { ToastController, Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject, FileUploadOptions, FileUploadResult} from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx/index';
import { DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { elementAt } from 'rxjs/operators';
import { LoadingController,AlertController  } from '@ionic/angular';
 
@Component({
  selector: 'app-list-home',
  templateUrl: './list-home.page.html',
  styleUrls: ['./list-home.page.scss'],
})
export class ListHomePage implements OnInit {
  [x: string]: any;
  showMessage(header, msg) {
    let alert = this.toastController.create({
      message: msg,
      duration: 3000,
      header: header,
      buttons: ['Aceptar']
    });
    alert.then(alert => alert.present());
  }

  copyFile = null;
  shouldMove = false;

  ListForDay:EventsList;
  ListFiles:Rutas[];
  automaticClose = false
  ListaRutasCarpetas:RegresoRuta[] = [];
  returnRutas:RegresoRuta = new RegresoRuta();
  RegresoRuta:RegresoRuta = new RegresoRuta();
  InfoFiles:InfoFiles[] = [];
  Childs:InfoFiles = new InfoFiles();
  load:any;
  

  constructor(
    private storage: Storage,                                          
    private jwtHelper: JwtHelperService,
    public homeEvent: HomeServiceService,
    public toastController: ToastController,
    public file: File,
    public transfer: FileTransfer,
    public document: DocumentViewer,
    public platform: Platform,
    private opener:FileOpener,
    public loadingController: LoadingController,
    private alertCtrl: AlertController,
    public modalController: ModalController
    ) { }
    Ip:string;
    Token:any;
    IdUsr:number;
    Name:string;
    InfoUsr:string;
    ExpandFile:boolean = false;
    NameFile:string;
    IsTypeFile:string;

    //hasChild = (_: number, node: ChildsFile) => node.expandable;


  ngOnInit() {
    //console.log("---------------------> hola como estaaaaaaa-------------------->");
    
    
    this.storage.get('DataValidation').then((DataValidation)=>{
      console.log("--------------->" + DataValidation);
      console.log(DataValidation[0].IP);
      this.Ip = DataValidation[0].IP;
      console.log("????????????????");
  });

    this.storage.get('TokenJWT').then((tokenJWT) => {

      var data = this.jwtHelper.decodeToken(tokenJWT).data;
      console.log("Other Dataaaaa----->" + tokenJWT);
      console.log('Your data is ===---->===========' + data[0].id);
       this.Token = tokenJWT;
       //console.log("Este es el TOKEN desde listEventssss-->" + this.Token);
       this.IdUsr = data[0].id;
        //console.log("Este es el Id del Usuario en La Lista------->" + this.IdUsr);
       this.Name = data[0].id;
        //console.log("Estes es el nombre del Usuario Logeado---->" + this.Name);
       this.InfoUsr = data[0];
       this.getListRutas(this.Token);
    });

  }

  getListRutas(Token:any){
    var RutaInicial = "/var/www/html/sicasci/sicasinfo/clientes";
    
    //console.log("ruta Inicial----> " + RutaInicial);
    this.homeEvent.getListRutas(Token, RutaInicial, this.Ip).subscribe(
      data =>{
        console.log("------------------RUTA--------------------------" + data);
        var tempdata = new Array<Rutas>();
        console.log(data);
        this.ListFiles = data;
        console.log(this.ListFiles);
        
          this.returnRutas.Acronimo = 'Inicio';
          this.returnRutas.RutaReal = "/var/www/html/sicasci/sicasinfo/clientes";
          var RutaInicial = "/var/www/html/sicasci/sicasinfo/clientes";
          /*Guardamos la ruta Inicial HOME */
          var NewRutaArray = RutaInicial;
          this.ListaRutasCarpetas.push(this.returnRutas);
          this.RegresoRuta = this.returnRutas;
      },
      err=>{
        console.log(err);
        console.log("hola como esta");
      })
  }

  toggleSecction(index){
    console.log("--------INDEX------------>" + index);
    
    this.ListFiles[index].open = !this.ListFiles[index].open;
    this.NameFile = this.ListFiles[index].FileName;
    this.IsTypeFile = this.ListFiles[index].ispdf;
    this.getNewRutas(index,this.ListFiles[index].FileName,this.ListFiles[index].TypeFile);

    if(this.automaticClose && this.ListFiles[index].open){
      console.log("--------------------***--------------------------");
      this.ListFiles.filter((item, itemIndex) => itemIndex != index)
      .map(item => item.open = false);
    }
  }

  getNewRutas(index:number, NameFile:string, TypeFile:string){
    //var RutaInicial = "/home/myschool/teamsdk/SICAS/AlmacenDocumentos";
    var RutaInicial = "/var/www/html/sicasci/sicasinfo/clientes";
    //console.log("Este es el token para validarnos--->  " + this.Token);
    //console.log("Nuevos datos a consultar ---->  " + index + " Name " + NameFile + " TypoFile "+ TypeFile);
    if(TypeFile == 'Directorio'){
      //console.log("-----entrando al IF de los directorios-----")
          if(this.ListaRutasCarpetas.length == 0 || this.ListaRutasCarpetas.length == undefined){
            this.returnRutas.Acronimo = 'Inicio';
            this.returnRutas.RutaReal = "/var/www/html/sicasci/sicasinfo/clientes";
            var RutaInicial = "/var/www/html/sicasci/sicasinfo/clientes";
            /*Guardamos la ruta Inicial HOME */
            var NewRutaArray = RutaInicial;
            this.ListaRutasCarpetas.push(this.returnRutas);
            this.RegresoRuta = this.returnRutas;
          }else{
            
          }
      
      /*Creamos un arreglo para guardar las rutas de las carpetas para hacer las busquedas de archivos*/
          this.returnRutas = new RegresoRuta();
          var X = this.ListaRutasCarpetas.length-1;
          this.returnRutas.Acronimo = this.ListaRutasCarpetas[X].Acronimo+" > "+NameFile;
          this.returnRutas.RutaReal = this.ListaRutasCarpetas[X].RutaReal + "/" + NameFile;
          var NewRutaArray = this.RegresoRuta + "/" + NameFile;
          
          
          //evitar acceder siempre a la misma carpeta
          this.ListaRutasCarpetas.forEach(element =>{
            console.log("Este es el ultimo elemento ingresado -->");
            console.log(element);
            if(this.RegresoRuta.RutaReal == element.RutaReal){
              console.log("valor de regreso-->"+element.RutaReal);
              this.ListaRutasCarpetas.push(this.returnRutas);
              var Ru = this.ListaRutasCarpetas.length - 1;
              this.RegresoRuta = this.returnRutas;
            }
            
          });
        
      //console.log(this.ListaRutasCarpetas);
      /*si es una carpeta volvemos a pedir la informacion de esa ruta (se guarda la ruta para hacer peticiones de regreso)*/
      this.homeEvent.getComplementRutas(this.Token, this.RegresoRuta.RutaReal, this.Ip).subscribe(data =>{
        //console.log("esta es la data");
        //console.log(data);
        this.ListFiles = data;
      });
    }else{
      console.log("Entando al if de los archivos");
      /*en esta opcion es un archivo para realizar la consulta de los movimientos del archivo */
      this.homeEvent.getInformationFile(this.Token, NameFile, this.Ip).subscribe(data =>{
        console.log(data);
        console.log("-----------------------------------------");
        if(this.InfoFiles.length < 0){
          this.InfoFiles = [];
        }
        this.InfoFiles = data;

          console.log(this.Childs);
          this.ListFiles.forEach(element =>{
            console.log(element);
            if(index + 1 == element.Index -2){
              element.Child = this.InfoFiles;
            }
          });
        console.log("Despues del Insert en el arreglo Hijo");
        console.log(this.ListFiles);
      },
      err =>{
        console.log("error al recueprar la informacion del archivo");
        console.log(err);
      });
      
    }
    
  }

  BackRuta(){
      //alert("dentro del metodo para regresar a la ultima ruta guardada" + this.RegresoRuta);
      var elm = this.ListaRutasCarpetas.map(elem => elem).indexOf(this.RegresoRuta);
      //alert("Esta es la ruta a eliminar---> " + elm);
      this.ListaRutasCarpetas.splice(elm,1);
      //console.log(this.ListaRutasCarpetas);
      var total = this.ListaRutasCarpetas.length - 1;
      this.RegresoRuta = this.ListaRutasCarpetas[total];
      //alert("total de registros en el arreglo----> " + total);
      var ReturnRuta = this.ListaRutasCarpetas[total];
      //console.log("Ruta final de regresooooooooo----> " );
      //console.log(ReturnRuta);
      this.homeEvent.getComplementRutas(this.Token, ReturnRuta.RutaReal, this.Ip).subscribe(data =>{
      //console.log("esta es la data");
      //console.log(data);
      this.ListFiles = data;
      //this.InfoFiles = [];
    });
  }


  async downloadandOpenPDF(index){
    
      let path = null;
      if(this.platform.is('ios')){
        path = this.file.documentsDirectory;
      }else{
        path = this.file.dataDirectory;
      }

      console.log(index.FileName);
      var y = this.ListaRutasCarpetas.length-1;
      var rutarel =this.ListaRutasCarpetas[y].RutaReal;
      var ruta = rutarel.substring(21);
      var rutadec = encodeURI(ruta);
      var file = encodeURI(index.FileName);
      const url = 'http://'+this.Ip+ rutadec + "/" + file;
      console.log();
      //alert(url);
      const fileTransfer: FileTransferObject = this.transfer.create();
      
        const loading = await this.loadingController.create({
          message: 'Descargando..',
        });
        await loading.present(); 
        // Download a file:
        fileTransfer.download(url, path + index.FileName).then(entry =>{
        console.log(entry);
        let urldata = entry.toURL(); 
        //esta opcion de viewDocument es para abri un pdf sin dar opcion de con cual app 
        //this.document.viewDocument(urldata, 'application/pdf', {});
        //let ext = this.getMIMEtype(this.IsTypeFile);
      var mimetype = this.getMIMEtypes(this.IsTypeFile);
        this.opener.open(urldata, mimetype)
        .then(() =>{
          //alert('Archivo abierto');
          console.log(urldata);
          console.log(mimetype);
          loading.dismiss();
          // this.opener.showOpenWithDialog(urldata, mimetype).finally(() =>{
          //   console.log("opened...!!!");
          // });
        }).catch(e =>{
          loading.dismiss();
          console.log('Error opening file', e);
          //alert("Error Opening"+e);
          this.showMessage("Error" , "Error al abrir el Documento, intentar de nuevo.");
        });
      }).catch(e =>{
        this.showMessage("Error al Descargar" , "Error al descargar el archivo, intentar de nuevo.");
        console.log(e.exception);
        //alert(e.exception);
        //alert(e.http_status);
        //alert("dentro de el catch de la descarga ------");
        loading.dismiss();
      });
  }


  getMIMEtypes(ext:any){
    let MIMEtype = {
        'aac' : 'audio/aac',
        'abw' : 'application/x-abiword',
        'arc' : 'application/x-freearc',
        'avi' : 'video/x-msvideo',
        'azw' : 'application/vnd.amazon.ebook',
        'bin' : 'application/octet-stream',
        'bmp' : 'image/bmp',
        'bz' : 'application/x-bzip',
        'bz2' : 'application/x-bzip2',
        'csh' : 'application/x-csh',
        'css' : 'text/css',
        'csv' : 'text/csv',
        'doc' : 'application/msword',
        'docx' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        //'docx': 'application/docx',
        'eot' : 'application/vnd.ms-fontobject',
        'epub' : 'application/epub+zip',
        'gif' : 'image/gif',
        'htm' : 'text/html',
        'html' : 'text/html',
        'ico' : 'image/vnd.microsoft.icon',
        'ics' : 'text/calendar',
        'jar' : 'application/java-archive',
        'jpeg' : 'image/jpeg',
        'jpg' : 'image/jpeg',
        'js' : 'text/javascript',
        'json' : 'application/json',
        'jsonld' : 'application/ld+json',
        'mid' : 'audio/midi',
        'midi' : 'audio/midi',
        'mjs' : 'text/javascript',
        'mp3' : 'audio/mpeg',
        'mpeg' : 'video/mpeg',
        'mpkg' : 'application/vnd.apple.installer+xml',
        'odp' : 'application/vnd.oasis.opendocument.presentation',
        'ods' : 'application/vnd.oasis.opendocument.spreadsheet',
        'odt' : 'application/vnd.oasis.opendocument.text',
        'oga' : 'audio/ogg',
        'ogv' : 'video/ogg',
        'ogx' : 'application/ogg',
        'otf' : 'font/otf',
        'png' : 'image/png',
        'pdf' : 'application/pdf',
        'ppt' : 'application/vnd.ms-powerpoint',
        'pptx' : 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'rar' : 'application/x-rar-compressed',
        'rtf' : 'application/rtf',
        'sh' : 'application/x-sh',
        'svg' : 'image/svg+xml',
        'swf' : 'application/x-shockwave-flash',
        'tar' : 'application/x-tar',
        'tif' : 'image/tiff',
        'tiff' : 'image/tiff',
        'ttf' : 'font/ttf',
        'txt' : 'text/plain',
        'vsd' : 'application/vnd.visio',
        'wav' : 'audio/wav',
        'weba' : 'audio/webm',
        'webm' : 'video/webm',
        'webp' : 'image/webp',
        'woff' : 'font/woff',
        'woff2' : 'font/woff2',
        'xhtml' : 'application/xhtml+xml',
        'xls' : 'application/vnd.ms-excel',
        'xlsx' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'xml' : 'application/xml&nbsp;',
        'xlsm': 'application/vnd.ms-excel.sheet.macroEnabled.12',
        'xul' : 'application/vnd.mozilla.xul+xml',
        'zip' : 'application/zip',
        '3gp' : 'video/3gpp',
        '3g2' : 'video/3gpp2',
        '7z' : 'application/x-7z-compressed'
    }
    return MIMEtype[ext];
  }

  async createFile() {
    let alert = await this.alertCtrl.create({
      header: 'Create file',
      message: 'Please specify the name of the new file',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'MyFile'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Create',
          handler: data => {
            console.log(data);
            console.log("este metodo es para crear un Archivo------");
            var y = this.ListaRutasCarpetas.length-1;
            console.log(this.ListaRutasCarpetas[y].RutaReal);

            // this.file
            //   .writeFile(
            //     `${this.file.dataDirectory}/${this.folder}`,
            //     `${data.name}.txt`,
            //     `My custom text - ${new Date().getTime()}`
            //   )
            //   .then(res => {
            //     this.loadDocuments();
            //   });
          }
        }
      ]
    });
   
    await alert.present();
  }

  async createFolder() {
    let alert = await this.alertCtrl.create({
      header: 'Create folder',
      message: 'Please specify the name of the new folder',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'MyDir'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Create',
          handler: async data => {
            console.log(data);
            console.log("este metodo es para crear un Folder------");
            var y = this.ListaRutasCarpetas.length-1;
            //console.log(y);
            console.log(this.ListaRutasCarpetas[y].RutaReal);
            console.log(this.Ip);
            var rutaregreso = this.ListaRutasCarpetas[y].Acronimo;
            // if(rutaregreso == 'inicio'){
            //   rutaregreso = 'clientes';
            // }
            var operacion = "Dir";
            var RutaReal = this.ListaRutasCarpetas[y].RutaReal;

            const loading = await this.loadingController.create({
              message: 'Espera por Favor...',
            });
            await loading.present(); 
            this.homeEvent.createnewDir(this.Ip,operacion,RutaReal,data.name).subscribe(async dat=>{
              console.log(dat);
              loading.dismiss();
              this.showMessage("Succes" , data);
              this.getNewRutas(0,data.name,'Directorio');
              //this.BackRuta();
            },err=>{
              loading.dismiss();
              this.showMessage("Error" , "Error al crear la carpeta, Intenta mas tarde");
              console.log("error al crear la carpeta en el lugar idnicado");
              console.log(err);
            })
            // this.file
            //   .createDir(
            //     `${this.file.dataDirectory}/${this.folder}`,
            //     data.name,
            //     false
            //   )
            //   .then(res => {
            //     this.loadDocuments();
            //   });
          }
        }
      ]
    });
    await alert.present();
  }

  deleteFile(item){
    console.log("metodo delete");
    //alert(item);
    console.log(item);
    console.log("valor dentro del delete" + item.FileName);
    var y = this.ListaRutasCarpetas.length-1;
    console.log(y);
    console.log(this.ListaRutasCarpetas[y].RutaReal);
    console.log(item.FileName);
    var rutaregreso = this.ListaRutasCarpetas[y].Acronimo;
    if(rutaregreso == 'inicio'){
      rutaregreso = 'clientes';
    }
    
    var TypeOper = "Delete";
    var Type = item.TypeFile;
    var Destino = this.ListaRutasCarpetas[y].RutaReal;
    var Name  = item.FileName;
    this.homeEvent.deleteFilesorDir(this.Ip,TypeOper,Type,Destino,Name).subscribe(data =>{
      console.log(data);
      this.showMessage("Succes" , data);
      this.getNewRutas(0,item.FileName,item.TypeFile);
      this.BackRuta();
    }, err =>{
      console.log(err);
      this.showMessage("Error" , err);
    })
  }


  async presentModal(item) {
    //alert(item.FileName);
    const modal = await this.modalController.create({
      component: UpdatePage,
      cssClass: 'modal-wrapper'
    });
    return await modal.present();
  }


  startCopy(item){
    alert("metodo copy");
    //alert(item);
    console.log(item.FileName);
  }

  satartMove(item){

  }

}
