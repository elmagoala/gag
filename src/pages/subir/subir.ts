import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {
  titulo: string = "";
  imagen: string = "";
  imagen64: string;
  constructor(private viewCtrl: ViewController,
              private camera: Camera,
              public alertCtrl: AlertController,
              private cargarArchivoProvider: CargaArchivoProvider) {
  }

  cerrarModal() {
    this.viewCtrl.dismiss();
  }

  mostrarCamara() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imagen = 'data:image/jpeg;base64,' + imageData;
      this.imagen64 = imageData;
    }, (err) => {
      console.error(err);
    });
  }

  seleccionarImagen() {
    let options = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY //DESDE Libreria
    };
    this.camera.getPicture(options).then((imageData) => {
      this.imagen = 'data:image/jpeg;base64,' + imageData;
      this.imagen64 = imageData;
    }, (err) => {
      console.log("Error en galería: ", JSON.stringify(err));
    });
  }

  crearPost() {
    let archivo = {
      img: this.imagen64,
      titulo: this.titulo
    }
    this.cargarArchivoProvider.cargarImagenFirebase(archivo)
        .then(()=>this.cerrarModal());
  }

  showAlert(mensaje: string) {
    let alert = this.alertCtrl.create({
      title: 'Mensaje',
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }

}
