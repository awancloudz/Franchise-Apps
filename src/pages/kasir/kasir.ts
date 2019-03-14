import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the KasirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kasir',
  templateUrl: 'kasir.html',
})
export class KasirPage {

  kasir_menu: string

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KasirPage');
  }

  ionViewWillEnter(){
    this.kasir_menu = "food"
    
    }
}

