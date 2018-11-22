import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, PopoverController, ActionSheetController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  filter: string;
  selectOptions: any;
  tanggal_awal:any;
  tanggal_akhir:any;

  constructor (public navCtrl: NavController,
              public navParams: NavParams,
              public alertController: AlertController,
              public popoverController: PopoverController,
              public actionsheetController: ActionSheetController,
              public viewCtrl: ViewController,
              private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  pilihfilter(item){
    this.viewCtrl.dismiss(item);
  }
  pilihtanggal(item){
      this.storage.set('tanggal_awal', this.formatDate(this.tanggal_awal));
      this.storage.set('tanggal_akhir', this.formatDate(this.tanggal_akhir));
      this.viewCtrl.dismiss(item);
  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  ionViewWillEnter () {
    this.filter = "sub-kategori";
  }

}
