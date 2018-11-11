import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MitraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mitra',
  templateUrl: 'mitra.html',
})
export class MitraPage {

  mitra:string;

  constructor (   public navCtrl: NavController,
                  public navParams: NavParams,
                  public nav: NavController,) {
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MitraPage');
  }

  ionViewWillEnter(){
    this.mitra = "calon_mitra";
  }

  mitradetail() {
    this.nav.push (MitradetailPage);
  }
}

@Component({
  selector: 'page-mitra',
  templateUrl: 'mitra-detail.html',
})
export class MitradetailPage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MitraPage');
  }

}