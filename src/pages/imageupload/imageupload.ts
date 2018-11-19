import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, PopoverController, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-imageupload',
  templateUrl: 'imageupload.html',
})
export class ImageuploadPage {

  constructor (public navCtrl: NavController,
              public navParams: NavParams,
              public alertController: AlertController,
              public popoverController: PopoverController,
              public actionsheetController: ActionSheetController,) {
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SortPage');
  }

  closeButton() {
    this.navCtrl.pop();
  }
}
