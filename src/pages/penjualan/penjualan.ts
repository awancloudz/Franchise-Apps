import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,Platform, ActionSheetController, LoadingController ,ToastController,AlertController,normalizeURL } from 'ionic-angular';
//Tambahkan Provider
import { PenjualanserviceProvider } from '../../providers/penjualanservice/penjualanservice';
import { PenjualanArray } from './penjualanarray';
import { Storage } from '@ionic/storage';
//Camera
import {Camera, CameraOptions} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilterPage } from '../filter/filter';

/**
 * Generated class for the PenjualanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-penjualan',
  templateUrl: 'penjualan.html',
})
export class PenjualanPage {
  public category: string = 'order';
  public categories: Array<string> = ['order','proses','kirim','selesai']

  items:PenjualanArray[]=[];

  constructor(  public navCtrl: NavController,public navParams: NavParams,private modalController: ModalController,
    public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,public loadincontroller:LoadingController,public _toast:ToastController,
    public penjualanservice:PenjualanserviceProvider,private storage: Storage) {
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

  ionViewDidLoad(){
    //Loading bar
    let loadingdata=this.loadincontroller.create({
      content:"Loading..."
    });
    loadingdata.present();
    //Tampilkan data dari server
    this.penjualanservice.tampilkanpembelian().subscribe(
      //Jika data sudah berhasil di load
      (data:PenjualanArray[])=>{
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
  
  onTabChanged(tabName){
    this.category = tabName;
  }

  openFilter(){
    let openFilter = this.modalController.create (FilterPage);
    openFilter.present();
  }
  
  penjualandetail(item){
    this.nav.push (PenjualandetailPage, {item: item});
  }
}

@Component({
  selector: 'page-penjualan',
  templateUrl: 'penjualan-detail.html',
  entryComponents:[ PenjualanPage ], 
})
export class PenjualandetailPage {
  item;
  id:Number
  kodepenjualan:String;
  id_users:Number;
  totaldiskon:Number;
  totalbelanja:Number;
  subtotal:Number;
  tanggal:Date;
  status:String;
  bukti:String;
  items:PenjualanArray[]=[];
  constructor(  public navCtrl: NavController,public params: NavParams,private modalController: ModalController,
    public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public penjualanservice:PenjualanserviceProvider) {
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
  this.penjualanservice.tampilkandetail(new PenjualanArray(this.item.id,this.item.kodepenjualan,this.item.id_users,this.item.tanggal,this.item.totaldiskon,this.item.totalbelanja,this.item.subtotal,this.item.status,this.item.bukti)).subscribe(
    //Jika data sudah berhasil di load
    (data:PenjualanArray[])=>{
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
tombolproses(item){
  if(this.item.status == 'order'){
    var pesan = "Pesanan sudah dikonfirmasi,silahkan diproses."; 
  }
  if(this.item.status == 'proses'){
    var pesan = "Proses pesanan selesai,silahkan dikirim."; 
  }
  //Pemberitahuan
  let alert = this.alertCtrl.create({
    title: 'Informasi',
    subTitle: pesan,
    buttons: [
      {
        text: 'OK',
        handler: () => {
          this.nav.setRoot(PenjualanPage);
        }
      }
    ]
  });
  //Loading bar
  let loadingdata=this.loadincontroller.create({
    content:"Loading..."
  });
  loadingdata.present();
  //Tampilkan data dari server
  this.penjualanservice.editpembelian(new PenjualanArray(this.item.id,this.item.kodepenjualan,this.item.id_users,this.item.tanggal,this.item.totaldiskon,this.item.totalbelanja,this.item.subtotal,this.item.status,this.item.bukti))
  .subscribe(
    //Jika data sudah berhasil di load
    (data:PenjualanArray[])=>{
      this.items=data;
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
}