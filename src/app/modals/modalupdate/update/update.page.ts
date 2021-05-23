import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  folder = '';
  directoris = [];
  constructor( 
    public file: File,
    private opener:FileOpener,
    public toastController: ToastController,
    public platform: Platform,
    public modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.file.listDir(this.file.externalRootDirectory , this.folder).then(res=>{
      console.log(res);
      this.directoris = res;
    })
  }

  itemSelected(file:any){
    console.log(file);
    if(file.isFile == true){
      console.log("es un archivo");
    }else{
      let pathtoOpen = this.folder != '' ? this.folder + '/' + file.name : file.name;
      console.log(pathtoOpen);
      let folder = encodeURIComponent(pathtoOpen);
      console.log(folder);
      this.router.navigateByUrl(`/update/${folder}`);
    }
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
