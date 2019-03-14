import { Component } from '@angular/core';
import { IonicPage, Events,NavController, NavParams, Platform, ModalController,ActionSheetController, LoadingController ,ToastController,AlertController,normalizeURL } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-staff',
  templateUrl: 'staff.html',
})
export class StaffPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffPage');
  }

  staffdetail () {
    this.nav.push (StaffdetailPage);
  }
}

@Component({
  selector: 'page-staff',
  templateUrl: 'staff-detail.html',
})
export class StaffdetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffPage');
  }

}