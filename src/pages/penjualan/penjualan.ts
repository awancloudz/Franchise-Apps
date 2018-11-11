import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FilterPage } from '../filter/filter';

/**
 * Generated class for the PenjualanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-penjualan',
  templateUrl: 'penjualan.html',
})
export class PenjualanPage {

  category:string;

  constructor(  public navCtrl: NavController,
                public navParams: NavParams,
                private modalController: ModalController,
                public nav: NavController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PenjualanPage');
  }

  ionViewWillEnter(){
    this.category = "order";
  }

  openFilter () {
    let openFilter = this.modalController.create (FilterPage);
    openFilter.present();
    }
  
  penjualandetail () {
    this.nav.push (PenjualandetailPage);
  }
}

@Component({
  selector: 'page-penjualan',
  templateUrl: 'penjualan-detail.html',
})
export class PenjualandetailPage {

  constructor(  public navCtrl: NavController,
                public navParams: NavParams,
                private modalController: ModalController,
                public nav: NavController,) {
  }
}