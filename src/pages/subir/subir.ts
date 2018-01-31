import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {
  titulo: string;
  imagen: string;
  constructor(private viewCtrl: ViewController,
              private camera: Camera) {
  }

  cerrarModal() {
    this.viewCtrl.dismiss();
  }

  mostrarCamara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imagen = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.error(err);
    });
  }

}
