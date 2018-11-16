import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,Platform, ActionSheetController, LoadingController ,ToastController,AlertController, } from 'ionic-angular';

/**
 * Generated class for the ProdukPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produk',
  templateUrl: 'produk.html',
})
export class ProdukPage {

  constructor ( public navCtrl: NavController,
                public navParams: NavParams,
                private modalController: ModalController,
                public nav: NavController,
                public platform: Platform,
                public actionSheetCtrl: ActionSheetController,
                public alertCtrl: AlertController,
                public loadincontroller:LoadingController,
                public _toast:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdukPage');
  }

  produkedit () {
    this.nav.push (ProdukeditPage);
  }

  produkcreate () {
    this.nav.push (ProdukcreatePage);
  }

}

@Component({
  selector: 'page-produk',
  templateUrl: 'produk-edit.html',
})
export class ProdukeditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdukPage');
  }

}

@Component({
  selector: 'page-produk',
  templateUrl: 'produk-create.html',
})
export class ProdukcreatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdukPage');
  }

}
