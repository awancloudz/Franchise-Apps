import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, PopoverController, ActionSheetController } from 'ionic-angular';

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

  constructor (public navCtrl: NavController,
              public navParams: NavParams,
              public alertController: AlertController,
              public popoverController: PopoverController,
              public actionsheetController: ActionSheetController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  closeFilter() {
    this.navCtrl.pop();
  }

  ionViewWillEnter () {
    this.filter = "sub-kategori";
  }

}
