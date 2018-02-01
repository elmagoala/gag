import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';

@Injectable()
export class CargaArchivoProvider {

  lastKey: string = null;

  constructor(public toastCtrl: ToastController,
              private aFDb: AngularFireDatabase) {

  }

  /*cargarUltimoKey() {
    this.aFDb.list('/post', ref=> ref.orderByKey().limitToLast(1))
             .valueChanges()
             .map(())
  }*/

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
          this.mostrarToast('Imagen cargada correctamente');
          let url = uploadTask.snapshot.downloadURL;
          this.crearPost(archivo.titulo, url, nombreArchivo);
          resolve();
        }
      );
    });
    return promesa;
  }

  private crearPost( titulo: string, url: string, nombreArchivo: string) {
    let post: Archivo = {
      img: url,
      titulo: titulo,
      key: nombreArchivo
    };

    this.aFDb.object(`/post/${ nombreArchivo }`).update(post);

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
