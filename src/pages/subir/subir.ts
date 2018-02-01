import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {
  titulo: string;
  imagen: string;
  imagen64: string;
  constructor(private viewCtrl: ViewController,
              private camera: Camera,
              private imagePicker: ImagePicker,
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
    let opciones: ImagePickerOptions = {
      quality: 70,
      outputType: 1,
      maximumImagesCount: 1
    };

    this.imagePicker.getPictures(opciones).then((results) => {
      for (let img of results){
        this.imagen = img;
        img = img.replace('data:image/jpeg;base64,','');
        break;
      }
    }, (err) => {
      this.showAlert("Error seleccion: "+ JSON.stringify(err));
    });

    /*this.imagePicker.getPictures(opciones).then((results) => {
      for (let i = 0; i < results.length; i++) {
          this.imagen = 'data:image/jpeg;base64,' + results[i];
      }
    }, (err) => {
        this.showAlert("Error: "+ JSON.stringify(err));
    });*/
  }

  crearPost() {
    let archivo = {
      img: this.imagen64,
      titulo: this.titulo
    }
    this.cargarArchivoProvider.cargarImagenFirebase(archivo);
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
