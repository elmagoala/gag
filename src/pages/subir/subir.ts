import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {
  titulo: string;
  constructor(private viewCtrl: ViewController) {
  }

  cerrarModal() {
    this.viewCtrl.dismiss();
  }

  mostrarCamara() {
    
  }

}
