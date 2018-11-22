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
import { ImagezoomPage } from '../imagezoom/imagezoom';
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

    this.storage.get('tanggal_awal').then((awal) => {
      this.storage.get('tanggal_akhir').then((akhir) => {
        console.log(awal);
        console.log(akhir);
        loadingdata.present();
        //Tampilkan data dari server
        this.penjualanservice.tampilkanpembelian(awal,akhir).subscribe(
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
      });
    });
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  
  onTabChanged(tabName){
    this.category = tabName;
  }

  openFilter(){
  
    let openFilter = this.modalController.create (FilterPage);
    openFilter.present();

    //Action Filter
    openFilter.onDidDismiss(data => {
      //Variabel Pilihan Tanggal
      var hariini = new Date();
      var hariini2 = new Date().setDate(hariini.getDate() - 1);
      var minggulalu = new Date().setDate(hariini.getDate() - 7);
      var tanggal = hariini, tahun = tanggal.getFullYear(), bulan = tanggal.getMonth();
      var awalbulan = new Date(tahun, bulan, 1);
      var awalbulanlalu = new Date(tahun, bulan - 1, 1);
      var akhirbulanlalu = new Date(tahun, bulan, 0);
      var awaltahun = new Date(tahun, 0, 1);
      var akhirtahun = new Date(tahun, 11, 31);
      //Hari Ini
      if(data == 1){
        this.storage.set('tanggal_awal', this.formatDate(hariini2));
        this.storage.set('tanggal_akhir', this.formatDate(hariini));
        this.nav.setRoot(PenjualanPage);
      }
      //Seminggu Terakhr
      else if(data == 2){
        this.storage.set('tanggal_awal', this.formatDate(minggulalu));
        this.storage.set('tanggal_akhir', this.formatDate(hariini));
        this.nav.setRoot(PenjualanPage);
      }
      //Bulan Ini
      else if(data == 3){
        this.storage.set('tanggal_awal', this.formatDate(awalbulan));
        this.storage.set('tanggal_akhir', this.formatDate(hariini));
        this.nav.setRoot(PenjualanPage);
      }
      //Bulan Lalu
      else if(data == 4){
        this.storage.set('tanggal_awal', this.formatDate(awalbulanlalu));
        this.storage.set('tanggal_akhir', this.formatDate(akhirbulanlalu));
        this.nav.setRoot(PenjualanPage);
      }
      //Tahun Ini
      else if(data == 5){
        this.storage.set('tanggal_awal', this.formatDate(awaltahun));
        this.storage.set('tanggal_akhir', this.formatDate(akhirtahun));
        this.nav.setRoot(PenjualanPage);
      }
      //Seleksi Tanggal
      else if(data == 6){
        this.nav.setRoot(PenjualanPage);
      }
    });
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
  zoom;
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
  imagezoom (item2) {
    this.zoom = "http://localhost:8000/verifikasi/" + item2.bukti;
    console.log(this.zoom);
    let imagezoom = this.modalController.create (ImagezoomPage, {item: this.zoom});
    imagezoom.present();
  }
}