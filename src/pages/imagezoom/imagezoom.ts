import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImagezoomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imagezoom',
  templateUrl: 'imagezoom.html',
})
export class ImagezoomPage {
  item;
  constructor(public navCtrl: NavController, public params: NavParams) {
    this.item = params.data.item;
  }

  ionViewDidLoad() {
    console.log(this.item);
  }

  closezoom() {
    this.navCtrl.pop();
    }
}
