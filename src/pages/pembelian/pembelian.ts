import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
//Tambahkan Provider
import { PembelianserviceProvider } from '../../providers/pembelianservice/pembelianservice';
import { PembelianArray } from './pembelianarray';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PembelianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pembelian',
  templateUrl: 'pembelian.html',
})
export class PembelianPage {
  public category: string = 'order';
  public categories: Array<string> = ['order','proses','kirim','selesai']

  items:PembelianArray[]=[];
  //pembelian : String;

  constructor ( public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,public loadincontroller:LoadingController,public _toast:ToastController,
    public pembelianservise:PembelianserviceProvider,private storage: Storage) {
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

  ionViewDidLoad() {
    //Loading bar
    let loadingdata=this.loadincontroller.create({
      content:"Loading..."
    });
    loadingdata.present();
    //Tampilkan data dari server
    this.storage.get('id_user').then((user) => {
    this.pembelianservise.tampilkanpembelian(user).subscribe(
      //Jika data sudah berhasil di load
      (data:PembelianArray[])=>{
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

  pembeliandetail (item) {
    this.nav.push (PembelianDetailPage, {item: item});
  }

  onTabChanged(tabName) {
    this.category = tabName;
  }
}

@Component({
  selector: 'page-create-pembelian',
  templateUrl: 'pembelian.html',
})
export class PembelianCreatePage {
  item2;
  id:Number
  id_users:Number;
  totaldiskon:Number;
  totalbelanja:Number;
  subtotal:Number;
  tanggal:Date;
  status:String;
  items:PembelianArray[]=[];
  constructor(public params: NavParams,public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public pembelianservise:PembelianserviceProvider) {
    this.item2 = params.data.item2;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }

  //Tampil data awal
ionViewDidLoad(item2) {
  this.id_users = this.item2.user;
  this.subtotal = this.item2.subtotal;
  this.status = this.item2.status;
  this.tanggal = new Date();
    //Pemberitahuan
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Order sukses, silahkan melakukan pembayaran.',
      buttons: ['OK']
    });
    //Loading Data
    let loadingdata=this.loadincontroller.create({
        content:"Memproses pesanan..."
    });
    loadingdata.present();
    //Mengambil value dari input field untuk dimasukkan ke UsulanArray
    this.pembelianservise.tambahpembelian(new PembelianArray(this.id,this.id_users,this.tanggal,this.totaldiskon,this.totalbelanja,this.subtotal,this.status))
    .subscribe(
      (data:PembelianArray)=>{
        //Push
        loadingdata.dismiss();
        this.nav.setRoot(PembelianPage);
        //this.nav.setRoot(PembelianKonfirmasiPage, {item: item2});
      },
      function(error){

      },
      function(){
        alert.present();
      }
    );
}
}

@Component({
  selector: 'page-pembelian-detail',
  templateUrl: 'pembelian-detail.html',
  entryComponents:[ PembelianPage ], 
})
export class PembelianDetailPage {
  item;
  id:Number
  id_warga:Number;
  id_toko:Number;
  subtotal:Number;
  tanggal:String;
  status:String;
  items:PembelianArray[]=[];
  
  constructor(params: NavParams, public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public pembelianservice:PembelianserviceProvider) {
    this.item = params.data.item;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }

//Tampil data awal
ionViewDidLoad() {
  //Loading bar
  let loadingdata=this.loadincontroller.create({
    content:"Loading..."
  });
  loadingdata.present();
  //Tampilkan data dari server
  this.pembelianservice.tampilkandetail(new PembelianArray(this.item.id,this.item.id_users,this.item.tanggal,this.item.totaldiskon,this.item.totalbelanja,this.item.subtotal,this.item.status)).subscribe(
    //Jika data sudah berhasil di load
    (data:PembelianArray[])=>{
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

tombolselesai(item){
//Pemberitahuan
let alert = this.alertCtrl.create({
  title: 'Informasi',
  subTitle: 'Pembelian Selesai, terima kasih.',
  buttons: ['OK']
});
//Loading bar
let loadingdata=this.loadincontroller.create({
  content:"Loading..."
});
loadingdata.present();
//Tampilkan data dari server
this.pembelianservice.editpembelian(new PembelianArray(this.item.id,this.item.id_users,this.item.tanggal,this.item.totaldiskon,this.item.totalbelanja,this.item.subtotal,this.item.status))
.subscribe(
  //Jika data sudah berhasil di load
  (data:PembelianArray[])=>{
    this.items=data;
    this.nav.setRoot(PembelianPage);
  },
  //Jika Error
  function (error){   
  },
  //Tutup Loading
  function(){
    loadingdata.dismiss();
    alert.present();
  }
);
}
tombolkonfirmasi(item){
  this.nav.push (PembelianKonfirmasiPage, {item: item});
}

}

@Component({
  selector: 'page-verifikasi-pembelian',
  templateUrl: 'pembelian-konfirmasi.html',
})
export class PembelianKonfirmasiPage {
  item;
  items:PembelianArray[]=[];
  constructor(params: NavParams, public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public pembelianservice:PembelianserviceProvider) {
    this.item = params.data.item;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }

//Tampil data awal
ionViewDidLoad() {
  //Loading bar
  let loadingdata=this.loadincontroller.create({
    content:"Loading..."
  });
  loadingdata.present();
  //Tampilkan data dari server
  this.pembelianservice.tampilkandetail(new PembelianArray(this.item.id,this.item.id_users,this.item.tanggal,this.item.totaldiskon,this.item.totalbelanja,this.item.subtotal,this.item.status)).subscribe(
    //Jika data sudah berhasil di load
    (data:PembelianArray[])=>{
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
}


