import { Component, ViewChild } from '@angular/core';
//Tambahkan Provider
import { KeranjangserviceProvider } from '../../providers/keranjangservice/keranjangservice';
//Tambahkan Variabel Global
import { KeranjangArray } from '../../pages/keranjang/keranjangarray';
import { NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController, CardContent } from 'ionic-angular';
import { SearchPage } from '../../pages/search/search';
import { PembelianPage,PembelianCreatePage } from '../pembelian/pembelian';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the KeranjangPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-keranjang',
  templateUrl: 'keranjang.html',
  entryComponents: [ SearchPage ],
})
export class KeranjangPage {
  item;
  items:KeranjangArray[]=[];
  id:Number;
  id_users:Number;
  id_produk:Number;
  jumlah:Number;
  stok:any;

  constructor(public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public keranjangservice:KeranjangserviceProvider,private storage: Storage) {

  }

//Tampil data awal
ionViewDidLoad() {
  //Loading bar
  let loadingdata=this.loadincontroller.create({
    content:"Loading..."
  });
  loadingdata.present();
  this.storage.get('id_user').then((user) => {
  //Tampilkan data dari server
  this.keranjangservice.tampilkankeranjang(user).subscribe(
    //Jika data sudah berhasil di load
    (data:KeranjangArray[])=>{
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
  });
} 
tombolhapus(item){
//Alert Konfirmasi
let confirm = this.alertCtrl.create({
  title: 'Konfirmasi',
  message: 'Yakin Menghapus Item',
  buttons: [
    {
      text: 'Tidak',
      role: 'cancel',
      handler: () => {
        //console.log('Batal');
      }
    },
    {
      text: 'Ya',
      handler: () => {
        //Hapus item
        this.keranjangservice.hapuskeranjang(item).subscribe(
          (data:any)=>{
            let mes=this._toast.create({
            message:'Data dihapus',
            duration:1000,
            position:'top'
            });
            //this.items.splice(this.items.indexOf(item),1);
            mes.present();
            this.nav.setRoot(KeranjangPage);
          }
        );
        //End Hapus Item
      }
    }
  ]
});
confirm.present();
}

editjumlah(item){
    this.keranjangservice.editkeranjang(new KeranjangArray(item.id,item.id_users,item.id_produktoko,item.jumlah))
    .subscribe(
      (data:any)=>{

      },
      function(error){

      },
      function(){

      }
    );   
}

tombolsearch() {
  this.nav.push(SearchPage);
}
tombolbeli() {
  this.nav.setRoot(HomePage);
}
tombolkirim(item2) {
  this.nav.setRoot(PembelianCreatePage, { item: item2 });
}

increment(i){
  var subtotal = 0;
  var jumlahkeranjang = this.items["koleksi2"][0].jumlahkeranjang;
  for(var key in this.items)
  {
    if(key == "koleksi"){
      if(this.items[key][i].jumlah < 100)
      //Edit Jumlah
      this.items[key][i].jumlah = this.items[key][i].jumlah + 1;
      //Edit Total Belanja
      for(var a=0; a < jumlahkeranjang; a++){
        subtotal = subtotal + (this.items[key][a].produk.harga * this.items[key][a].jumlah);
      }
    }
    //Subtotal Baru
    if(key == "koleksi2"){
      this.items[key][0].subtotal = subtotal;
    }
  }
  this.editjumlah(this.items["koleksi"][i]);
} 
decrement(i){
  var subtotal = 0;
  var jumlahkeranjang = this.items["koleksi2"][0].jumlahkeranjang;
  for(var key in this.items)
  {
    if(key == "koleksi"){
      if(this.items[key][i].jumlah > 1)
      //Edit Jumlah
      this.items[key][i].jumlah = this.items[key][i].jumlah - 1;
      //Edit Total Belanja
      for(var a=0; a < jumlahkeranjang; a++){
        subtotal = subtotal + (this.items[key][a].produk.harga * this.items[key][a].jumlah);
      }
    }
    //Subtotal Baru
    if(key == "koleksi2"){
      this.items[key][0].subtotal = subtotal;
    }
  }
  this.editjumlah(this.items["koleksi"][i]);
} 

}

@Component({
  selector: 'page-create-keranjang',
  templateUrl: 'keranjang.html',
  entryComponents: [ SearchPage ],
})
export class KeranjangcreatePage {
  id:Number
  id_users:Number;
  item2;
  items:KeranjangArray[]=[];
  stok:any;
  constructor(public params: NavParams,public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public keranjangservice:KeranjangserviceProvider,private storage: Storage) {
      this.item2 = params.data.item2;
  }

  //Tampil data awal
ionViewDidLoad(item2) {
  
    //Pemberitahuan
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Barang dimasukkan keranjang',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });
    //Loading Data
    let loadingdata=this.loadincontroller.create({
        content:"Menambahkan ke keranjang..."
    });
    
    loadingdata.present();
  this.storage.get('id_user').then((user) => {
    //Mengambil value dari input field untuk dimasukkan ke UsulanArray
    this.keranjangservice.tambahkeranjang(new KeranjangArray(this.id,user,this.item2.id,1))
    .subscribe(
      (data:KeranjangArray)=>{
        //Push
        loadingdata.dismiss();
      },
      function(error){
  
      },
      function(){
        alert.present();
      }
    );
  });
  }
}
