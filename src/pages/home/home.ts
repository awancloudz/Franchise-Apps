import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController, ModalController, PopoverController } from 'ionic-angular';
import { KeranjangPage,KeranjangcreatePage } from '../../pages/keranjang/keranjang';
import { SearchPage } from '../../pages/search/search';
import { FilterPage } from '../filter/filter';
import { DaftarkurirPage } from '../daftarkurir/daftarkurir';
import { InformasitokoPage } from '../informasitoko/informasitoko';

//Tambahkan Provider
import { KategoriserviceProvider } from '../../providers/kategoriservice/kategoriservice';
import { HomeserviceProvider } from '../../providers/homeservice/homeservice';
//Tambahkan Variabel Global
import { KategoriArray } from '../../pages/kategori/kategoriarray';
import { HomeProdukArray } from '../../pages/home/homeprodukarray';
import { KategoriDetailPage } from '../../pages/kategori/kategori';
import { KeranjangArray } from '../keranjang/keranjangarray';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  entryComponents: [ KeranjangPage,SearchPage,KategoriDetailPage,KeranjangcreatePage ],
})
export class HomePage {
  carousel_case: string;
  id:Number;
  id_kategori:String;
  kodeproduk:String;
  namaproduk:String;
  stok:Number;
  harga:Number;
  diskon:Number;
  foto:String;
  items:HomeProdukArray[]=[];

  constructor (public nav: NavController,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadincontroller:LoadingController,
              public _toast:ToastController,
              public kategoriservice:KategoriserviceProvider,
              public homeservice:HomeserviceProvider) {
    //TOMBOL EXIT
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
          let confirm = this.alertCtrl.create({
            title: 'Konfirmasi',
            message: 'Anda Ingin Keluar dari Aplikasi',
            buttons: [
              {
                text: 'Tidak',
                role: 'cancel',
                handler: () => {
                
                }
              },
              {
                text: 'Ya',
                handler: () => {
                  navigator['app'].exitApp();
                }
              }
            ]
          });
          confirm.present();                
      });
    });
  }
  //Tampil data awal
ionViewDidLoad() {
  //Loading bar
  let loadingdata=this.loadincontroller.create({
    content:"Loading Produk..."
  });
  loadingdata.present();
  //Tampilkan data dari server
  this.homeservice.tampilkanproduk().subscribe(
    //Jika data sudah berhasil di load
    (data:HomeProdukArray[])=>{
      this.items=data;
    },
    //Jika Error
    function (error){   
    },
    //Tutup Loading
    function(){
      loadingdata.dismiss();
    }
  ); 
}

  tombolkeranjang() {
      this.nav.push (KeranjangPage);
  }

  tombolsearch() {
    this.nav.push (SearchPage);
  }

  tomboldetail(item) {
    this.nav.push(KategoriDetailPage, { item: item });
  }

  tombol() {
    this.nav.push (HomeDetailPage);
  }

  ionViewWillEnter(){
    this.carousel_case = "terpopuler";
  }

  tombolbeli(item) {
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Stok Kosong',
      buttons: ['OK']
    });
    if(item.stok < 1){
      alert.present();
    }
    else{
      this.nav.push(KeranjangcreatePage, {item2: item});
    }
  }
}

@Component({
  selector: 'home-detail',
  templateUrl: 'home-detail.html'
})
export class HomeDetailPage {

  constructor(public nav: NavController,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadincontroller:LoadingController,
              public _toast:ToastController) {

  }

tombol () {
  this.nav.push (HomethumbnailPage);
}
}

@Component({
  selector: 'home-thumbnail',
  templateUrl: 'home-thumbnail.html'
})
export class HomethumbnailPage {

  constructor(public nav: NavController,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadincontroller:LoadingController,
              public _toast:ToastController,
              private modalController: ModalController) {

  }
  
  openFilter () {
    let openFilter = this.modalController.create (FilterPage);
    openFilter.present();
    }
  
  tombol () {
  this.nav.push (HomeprodukdetailPage);
  }

  
}

@Component({
  selector: 'home-produk-detail',
  templateUrl: 'home-produk-detail.html'
})
export class HomeprodukdetailPage {

  public ionicNamedColor : String = 'light';

  constructor(public nav: NavController,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadincontroller:LoadingController,
              public _toast:ToastController,
              private modalController: ModalController,) {

  }
  
  public tombolwishlist() {
	  if(this.ionicNamedColor === 'light') { 
	    this.ionicNamedColor = 'danger'
	  } else {
	    this.ionicNamedColor = 'light'
	  }
  }
  
tombol_toko () {
  this.nav.push (HometokoPage);
}


chattoko () {
  this.nav.push (HomechatPage);
}

komentar () {
  this.nav.push (HomekomentarPage);
}

rating () {
  this.nav.push (HomeratingPage);
}

openDaftarkurir () {
	let openDaftarkurir = this.modalController.create (DaftarkurirPage);
	openDaftarkurir.present();
	}
}

@Component({
  selector: 'home-toko',
  templateUrl: 'home-toko.html'
})
export class HometokoPage {

  constructor(public nav: NavController,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadincontroller:LoadingController,
              public _toast:ToastController,
              private modalController: ModalController,) {

  }

  openInformasiToko () {
    let openInformasiToko = this.modalController.create (InformasitokoPage);
    openInformasiToko.present();
    }
  
  chattoko () {
    this.nav.push (HomechatPage);
  }
}

@Component({
  selector: 'home-chat',
  templateUrl: 'home-chat.html'
})
export class HomechatPage {

  constructor(public nav: NavController,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadincontroller:LoadingController,
              public _toast:ToastController,
              private modalController: ModalController,) {

  }

}

@Component({
  selector: 'home-komentar',
  templateUrl: 'home-komentar.html'
})
export class HomekomentarPage {

  constructor(public nav: NavController,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadincontroller:LoadingController,
              public _toast:ToastController,
              private modalController: ModalController,) {

  }

komentardetail () {
  this.nav.push (HomekomentardetailPage);
}

userprofile () {
  this.nav.push (HomeuserPage);
}
}

@Component({
  selector: 'home-komentar-detail',
  templateUrl: 'home-komentar-detail.html'
})
export class HomekomentardetailPage {

  constructor(public nav: NavController,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadincontroller:LoadingController,
              public _toast:ToastController,
              private modalController: ModalController,) {

  }

}

@Component({
  selector: 'home-user',
  templateUrl: 'home-user.html'
})
export class HomeuserPage {

  constructor(public nav: NavController,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadincontroller:LoadingController,
              public _toast:ToastController,
              private modalController: ModalController,
              public popoverCtrl: PopoverController,) {

  }

}

@Component({
  selector: 'home-rating',
  templateUrl: 'home-rating.html'
})
export class HomeratingPage {

  constructor(public nav: NavController,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadincontroller:LoadingController,
              public _toast:ToastController,
              private modalController: ModalController,
              public popoverCtrl: PopoverController,) {

  }

}
