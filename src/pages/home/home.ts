import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts: Observable<any[]>;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private afDB: AngularFireDatabase) {
    this.posts = this.afDB.list('post').valueChanges();
  }

  mostrarModal() {
    let modal = this.modalCtrl.create(SubirPage);
    modal.present();
  }

}
