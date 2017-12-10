import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular';
//Tambahkan Provider
import { PembelianserviceProvider } from '../../providers/pembelianservice/pembelianservice';
import { PembelianArray } from '../../pages/pembelian/pembelianarray';
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

  items:PembelianArray[]=[];

  constructor ( public nav: NavController,
              public platform: Platform,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public loadincontroller:LoadingController,
              public _toast:ToastController,
              public pembelianservise:PembelianserviceProvider
              ) {
            }

  ionViewDidLoad() {
    //Loading bar
    let loadingdata=this.loadincontroller.create({
      content:"Loading..."
    });
    loadingdata.present();
    //Tampilkan data dari server
    this.pembelianservise.tampilkanpembelian().subscribe(
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

  pembeliandetail (item) {
    this.nav.push (PembelianDetailPage, {item: item});
  }
}


@Component({
  selector: 'page-create-pembelian',
  templateUrl: 'pembelian.html',
})
export class PembelianCreatePage {
  item2;
  id:Number
  id_warga:Number;
  id_toko:Number;
  subtotal:Number;
  tanggal:String;
  status:String;
  items:PembelianArray[]=[];
  constructor(public params: NavParams,public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public pembelianservise:PembelianserviceProvider) {
      this.item2 = params.data.item2;
  }

  //Tampil data awal
ionViewDidLoad(item2) {
  this.id_warga = this.item2.warga;
  this.id_toko = this.item2.toko;
  this.subtotal = this.item2.subtotal;
  this.status = this.item2.status;
  var tanggalan = new Date().toLocaleDateString();
  this.tanggal = tanggalan;
    //Pemberitahuan
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Pembelian Sukses,silahkan menunggu hingga barang datang.',
      buttons: ['OK']
    });
    //Loading Data
    let loadingdata=this.loadincontroller.create({
        content:"Memproses pembelian..."
    });
    loadingdata.present();
    //Mengambil value dari input field untuk dimasukkan ke UsulanArray
    this.pembelianservise.tambahpembelian(new PembelianArray(this.id,this.id_warga,this.id_toko,this.tanggal,this.subtotal,this.status))
    .subscribe(
      (data:PembelianArray)=>{
        //Push
        loadingdata.dismiss();
        this.nav.setRoot(PembelianPage);
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
  }

//Tampil data awal
ionViewDidLoad() {
  //Loading bar
  let loadingdata=this.loadincontroller.create({
    content:"Loading..."
  });
  loadingdata.present();
  //Tampilkan data dari server
  this.pembelianservice.tampilkandetail(new PembelianArray(this.item.id,this.item.id_warga,this.item.id_toko,this.item.tanggal,this.item.subtotal,this.item.status)).subscribe(
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