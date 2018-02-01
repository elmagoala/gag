import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class CargaArchivoProvider {

  constructor(public toastCtrl: ToastController) {

  }

  cargarImagenFirebase( archivo: Archivo ) {
    let promesa = new Promise((resolve, reject)=>{
      this.mostrarToast('Cargando....');
      let storeRef = firebase.storage().ref();
      let nombreArchivo: string = new Date().valueOf().toString();
      let uploadTask: firebase.storage.UploadTask =
          storeRef.child(`img-gag/${ nombreArchivo }`)
                  .putString(archivo.img, 'base64', {contentType:'image/jpeg'});
      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{},//saber el % de cuantos Mbs se han subido
        (error)=>{
          //manejo de error
          console.log('Error en la Carga');
          console.log(JSON.stringify(error));
          this.mostrarToast(JSON.stringify(error));
          reject();
        },
        ()=>{
          //ok
          console.log('Archivo subido');
          this.mostrarToast('Imagen cargada correctamente');
          resolve();
        }
      );
    });
    return promesa;
  }

  private mostrarToast( mensaje: string ) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).present();
  }

}

interface Archivo {
  titulo: string;
  img: string;
  key?: string;
}
