import { Component } from '@angular/core';
//Tambahkan Provider
import { KategoriserviceProvider } from '../../providers/kategoriservice/kategoriservice';
import { KeranjangserviceProvider } from '../../providers/keranjangservice/keranjangservice';
//Tambahkan Variabel Global
import { KategoriArray } from '../../pages/kategori/kategoriarray';
import { NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
import { SearchPage } from '../../pages/search/search';
import { KeranjangPage,KeranjangcreatePage } from '../../pages/keranjang/keranjang';
import { KeranjangArray } from '../keranjang/keranjangarray';
import { PencarianprodukPage } from '../../pages/pencarianproduk/pencarianproduk';

@Component({
  selector: 'page-kategori',
  templateUrl: 'kategori.html',
  entryComponents: [ SearchPage,KeranjangPage ],
})
export class KategoriPage {
  items:KategoriArray[]=[];
  constructor(public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public kategoriservice:KategoriserviceProvider) {
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
    content:"Loading..."
  });
  loadingdata.present();
  //Tampilkan data dari server
  this.kategoriservice.tampilkankategori().subscribe(
    //Jika data sudah berhasil di load
    (data:KategoriArray[])=>{
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
  
  tomboldetail(item) {
    this.nav.push(KategoriDetailPage, { item: item });
  }

  tombolsearch () {
    this.nav.push (SearchPage);
  }

  tombolkeranjang () {
    this.nav.push (KeranjangPage);
  }

  kategoridetail () {
    this.nav.push (KategoriDetailPage);
  }

}

@Component({
  selector: 'page-kategori',
  templateUrl: 'kategori-detail.html',
  entryComponents: [ SearchPage,KeranjangPage,KeranjangcreatePage, PencarianprodukPage ],
})
export class KategoriDetailPage {
  item;
  id:Number;
  id2:Number;
  id_kategoriproduk:Number;
  namasubkategori:String;
  foto:String;
  items:KategoriArray[]=[];
  
  constructor(params: NavParams, public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public kategoriservice:KategoriserviceProvider,public keranjangservice:KeranjangserviceProvider) {
    this.item = params.data.item;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }

//Tampil data awal
/* ionViewDidLoad() {
  //Loading bar
  let loadingdata=this.loadincontroller.create({
    content:"Loading..."
  });
  loadingdata.present();
  //Tampilkan data dari server
  this.kategoriservice.tampilkandetail(new KategoriArray(this.item.id,this.id_kategoriproduk,this.item.namasubkategori,this.item.foto)).subscribe(
    //Jika data sudah berhasil di load
    (data:KategoriArray[])=>{
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
} */
  tombolsub(item){
    this.nav.push(KategoriDetailPage2, { item: item });  
  }
  tombolsearch() {
    this.nav.push(SearchPage);
  }

  tombolkeranjang() {
    this.nav.push(KeranjangPage);
  }

  tombolbeli(item2) {
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Stok Kosong',
      buttons: ['OK']
    });
    if(item2.stok < 1){
      alert.present();
    }
    else{
      this.nav.push(KeranjangcreatePage, {item2: item2});
    }
  }

  pencarianproduk () {
    this.nav.push (PencarianprodukPage);
  }
}

@Component({
  selector: 'page-kategori',
  templateUrl: 'kategori-detail.html',
  entryComponents: [ SearchPage,KeranjangPage,KeranjangcreatePage ],
})
export class KategoriDetailPage2 {
  item;
  id:Number;
  id2:Number;
  id_kategoriproduk:Number;
  namasubkategori:String;
  foto:String;
  items:KategoriArray[]=[];
  
  constructor(params: NavParams, public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public kategoriservice:KategoriserviceProvider,public keranjangservice:KeranjangserviceProvider) {
    this.item = params.data.item;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }

//Tampil data awal
ionViewDidLoad(item) {
  //Loading bar
  let loadingdata=this.loadincontroller.create({
    content:"Loading..."
  });
  loadingdata.present();
  //Tampilkan data dari server
  this.kategoriservice.tampilkandetail2(new KategoriArray(this.item.id,this.item.id_kategoriproduk,this.item.namasubkategori,this.item.foto)).subscribe(
    //Jika data sudah berhasil di load
    (data:KategoriArray[])=>{
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
  tombolsub(item){
    this.nav.push(KategoriDetailPage2, { item: item });  
  }
  tombolsearch() {
    this.nav.push(SearchPage);
  }

  tombolkeranjang() {
    this.nav.push(KeranjangPage);
  }

  tombolbeli(item2) {
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Stok Kosong',
      buttons: ['OK']
    });
    if(item2.stok < 1){
      alert.present();
    }
    else{
      this.nav.push(KeranjangcreatePage, {item2: item2});
    }
  }
}
