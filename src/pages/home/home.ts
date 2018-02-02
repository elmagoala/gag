import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts: Observable<any[]>;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private afDB: AngularFireDatabase,
              private socialSharing: SocialSharing) {
    this.posts = this.afDB.list('post').valueChanges();
  }

  mostrarModal() {
    let modal = this.modalCtrl.create(SubirPage);
    modal.present();
  }

  private convertToDataURLviaCanvas(url, outputFormat){
    return new Promise((resolve, reject) => {
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      let canvas = <HTMLCanvasElement> document.createElement('CANVAS'),
      ctx = canvas.getContext('2d'),dataURL;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      resolve(dataURL);
      canvas = null;
    };
    img.src = url;
  });
  }

  compartir( post:any ){
    this.convertToDataURLviaCanvas(post.img, "image/jpeg")
        .then(urldeimagen => {
          let urlbase64 = String(urldeimagen);
          this.socialSharing.shareViaFacebook(post.titulo,urlbase64,post.img)
          .then(() => {})// Success!
          .catch(() => {})// Error!
        });
  }
}
