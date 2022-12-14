import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
import { TokokategoriPage } from '../tokokategori/tokokategori';
import { TokopemesananPage } from '../tokopemesanan/tokopemesanan';
import { TokopenjualanPage } from '../tokopenjualan/tokopenjualan';
import { TokoprodukPage } from '../tokoproduk/tokoproduk';
import { TokoprofilePage } from '../tokoprofile/tokoprofile';
import { TokokeranjangPage2 } from '../tokokeranjang/tokokeranjang';
import { TokosearchPage } from '../tokosearch/tokosearch';
/**
 * Generated class for the TokoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-toko',
  templateUrl: 'toko.html',
})
export class TokoPage {

  tab1Root = TokoprofilePage;
  tab2Root = TokoprodukPage;
  tab3Root = TokopenjualanPage;
  tab4Root = TokopemesananPage;
  tab5Root = TokokategoriPage;

  constructor ( public nav: NavController,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadincontroller:LoadingController,
              public _toast:ToastController,) {
  }

tombolkeranjang() {
  this.nav.push(TokokeranjangPage2);
}
tombolsearch() {
  this.nav.push (TokosearchPage);
}
}
