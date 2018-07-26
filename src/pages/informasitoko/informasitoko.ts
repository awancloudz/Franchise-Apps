import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the InformasitokoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-informasitoko',
  templateUrl: 'informasitoko.html',
})
export class InformasitokoPage {

  constructor (public navCtrl: NavController,
              public navParams: NavParams,
              public alertController: AlertController,
              public popoverController: PopoverController,
              public actionsheetController: ActionSheetController,) {
          }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformasitokoPage');
  }

  closeInformasiToko() {
    this.navCtrl.pop();
    }
}
