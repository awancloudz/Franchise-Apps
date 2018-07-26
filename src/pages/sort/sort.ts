import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, PopoverController, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-sort',
  templateUrl: 'sort.html',
})
export class SortPage {

  constructor (public navCtrl: NavController,
              public navParams: NavParams,
              public alertController: AlertController,
              public popoverController: PopoverController,
              public actionsheetController: ActionSheetController,) {
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SortPage');
  }

  closeSort() {
    this.navCtrl.pop();
  }
}
