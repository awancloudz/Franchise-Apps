import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, LoadingController,ModalController ,ToastController,AlertController,normalizeURL } from 'ionic-angular';
//Tambahkan Provider
import { PembelianserviceProvider } from '../../providers/pembelianservice/pembelianservice';
import { PembelianArray } from './pembelianarray';
import { Storage } from '@ionic/storage';
//Camera
import {Camera, CameraOptions} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ImagezoomPage } from '../imagezoom/imagezoom';
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
  items:PembelianArray[]=[];
  constructor(public params: NavParams,public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public pembelianservice:PembelianserviceProvider,private storage: Storage) {
    this.item = params.data.item;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }

  //Tampil data awal
ionViewDidLoad(item) {
  this.kodepenjualan = this.item.kodepenjualan;
  this.id_users = this.item.user;
  this.subtotal = this.item.subtotal;
  this.status = this.item.status;
  this.tanggal = new Date();
  
    //Pemberitahuan
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Order sukses, silahkan melakukan pembayaran.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //Tampilkan data dari server
            this.pembelianservice.tampilkandetail2(this.item.kodepenjualan).subscribe(
              //Jika data sudah berhasil di load
              (data)=>{
                this.nav.setRoot(PembelianKonfirmasiPage, {item: data[0]});
              },
              //Jika Error
              function (error){},
              //Tutup Loading
              function(){}
            );
          }
        }
      ]
    });
    //Loading Data
    let loadingdata=this.loadincontroller.create({
        content:"Memproses pesanan..."
    });
    loadingdata.present();
    //Mengambil value dari input field untuk dimasukkan ke UsulanArray
    this.pembelianservice.tambahpembelian(new PembelianArray(this.id,this.kodepenjualan,this.id_users,this.tanggal,this.totaldiskon,this.totalbelanja,this.subtotal,this.status,this.bukti))
    .subscribe(
      (data:PembelianArray)=>{

      },
      function(error){
        loadingdata.dismiss();
      },
      function(){
        loadingdata.dismiss();
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
  items:PembelianArray[]=[];
  
  constructor(params: NavParams, public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    private modalController: ModalController,public loadincontroller:LoadingController,public _toast:ToastController,public pembelianservice:PembelianserviceProvider) {
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
  this.pembelianservice.tampilkandetail(new PembelianArray(this.item.id,this.item.kodepenjualan,this.item.id_users,this.item.tanggal,this.item.totaldiskon,this.item.totalbelanja,this.item.subtotal,this.item.status,this.item.bukti)).subscribe(
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
  buttons: [
    {
      text: 'OK',
      handler: () => {
        this.nav.setRoot(PembelianPage);
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
this.pembelianservice.editpembelian(new PembelianArray(this.item.id,this.item.kodepenjualan,this.item.id_users,this.item.tanggal,this.item.totaldiskon,this.item.totalbelanja,this.item.subtotal,this.item.status,this.item.bukti))
.subscribe(
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
    alert.present();
  }
);
}

tombolkonfirmasi(item){
  this.nav.push (PembelianKonfirmasiPage, {item: item});
}

tombolbatal(item){
//Pemberitahuan
let alert = this.alertCtrl.create({
  title: 'Informasi',
  subTitle: 'Pesanan sudah dibatalkan',
  buttons: ['OK']
});
//Loading bar
let loadingdata=this.loadincontroller.create({
  content:"Loading..."
});
//Alert Konfirmasi
let confirm = this.alertCtrl.create({
  title: 'Konfirmasi',
  message: 'Yakin Membatalkan Pesanan ?',
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
        loadingdata.present();
        //Tampilkan data dari server
        this.pembelianservice.hapuspembelian(new PembelianArray(this.item.id,this.item.kodepenjualan,this.item.id_users,this.item.tanggal,this.item.totaldiskon,this.item.totalbelanja,this.item.subtotal,this.item.status,this.item.bukti))
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
    }
  ]
});
confirm.present();
}
imagezoom (photo) {
  this.zoom = "http://localhost:8000/fotoupload/" + photo;
  let imagezoom = this.modalController.create (ImagezoomPage, {item: this.zoom});
  imagezoom.present();
}
}

@Component({
  selector: 'page-verifikasi-pembelian',
  templateUrl: 'pembelian-konfirmasi.html',
})
export class PembelianKonfirmasiPage {
  //Bukti Pembayaran
  public photos : any;
  public imageURI:any;
  public imageFileName:any;

  gbawal:String;
  item;
  items:PembelianArray[]=[];
  id:Number
  kodepenjualan:String;
  id_users:Number;
  totaldiskon:Number;
  totalbelanja:Number;
  subtotal:Number;
  tanggal:Date;
  status:String;
  bukti:String;
  constructor(params: NavParams, public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public pembelianservice:PembelianserviceProvider,private storage: Storage,private camera: Camera,private transfer: FileTransfer,
    private modalController: ModalController,private file: File) {
    this.item = params.data.item;
    console.log(this.item);
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
  this.pembelianservice.tampilkanverifikasi(new PembelianArray(this.item.id,this.item.kodepenjualan,this.item.id_users,this.item.tanggal,this.item.totaldiskon,this.item.totalbelanja,this.item.subtotal,this.item.status,this.item.bukti)).subscribe(
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

ngOnInit() {
  this.photos = [];
  if(this.item.bukti == ''){
    this.gbawal = "login_image/photo_placeholder.png";
  }
  else if(this.item.bukti != ''){
    this.gbawal = "http://localhost:8000/verifikasi/" + this.item.bukti;
  }
  this.photos.push(this.gbawal);
}

takeBukti(source: any) {
  const options : CameraOptions = {
    quality: 25, // picture quality
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: source,
  }
  this.camera.getPicture(options).then((imageData) => {
      var nama = imageData.substr(imageData.lastIndexOf('/') + 1);
      this.imageURI = normalizeURL(imageData);
      this.photos.splice(0, 1);
      this.photos.push(this.imageURI);
      this.photos.reverse();
      this.bukti = "bukti_" + nama;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
  });
}

updatebukti(item){
//Pemberitahuan
let alert = this.alertCtrl.create({
  title: 'Informasi',
  subTitle: 'Verifikasi Pembayaran Sukses',
  buttons: [
    {
      text: 'OK',
      handler: () => {
        this.nav.setRoot(PembelianPage);
      }
    }
  ]
});
//Loading bar
let loadingdata=this.loadincontroller.create({
  content:"Memproses Pembayaran..."
});
let info = this.alertCtrl.create({
  title: 'Tidak Terhubung ke server',
  message: 'Silahkan Periksa koneksi internet anda...',
});
let kosong = this.alertCtrl.create({
  title: 'Konfirmasi Gagal',
  message: 'Silahkan upload bukti pembayaran anda...',
});
if(this.photos != "login_image/photo_placeholder.png"){
loadingdata.present();
//Tampilkan data dari server
this.pembelianservice.verifikasipembelian(new PembelianArray(this.item.id,this.item.kodepenjualan,this.item.id_users,this.item.tanggal,this.item.totaldiskon,this.item.totalbelanja,this.item.subtotal,this.item.status,this.bukti))
.subscribe(
  //Jika data sudah berhasil di load
  (data:PembelianArray[])=>{
    this.items=data;
    this.uploadFile();
  },
  //Jika Error
  function (error){
    //Jika Koneksi Tidak ada
    if(error.status == 0){
      info.present();
    }
    loadingdata.dismiss();   
  },
  //Tutup Loading
  function(){
    loadingdata.dismiss();
    alert.present();
  }
);
}
else{
  kosong.present();
}
}
uploadFile() {
  let loader1 = this.loadincontroller.create({
    content: "Uploading Bukti Pembayaran..."
  });
  loader1.present();
  const fileTransfer: FileTransferObject = this.transfer.create();
  
  let options: FileUploadOptions = {
    fileKey: 'file3',
    params: {'fotobukti' : this.bukti},
    fileName: 'image.jpg',
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers: {}
  }
  
  fileTransfer.upload(this.imageURI, 'http://localhost:8000/api/uploadbukti', options)
    .then((data) => {
    this.imageFileName = "image.jpg";
    loader1.dismiss();
    this.presentToast("Upload Bukti Pembayaran Sukses");
    //this.nav.setRoot(PembelianPage);
  }, (err) => {
    console.log(err);
    loader1.dismiss();
    this.presentToast(err);
  });
}
presentToast(msg) {
  let toast = this._toast.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Tutup');
  });

  toast.present();
}
imagezoom (item) {
  let imagezoom = this.modalController.create (ImagezoomPage, {item: item});
  imagezoom.present();
}
}


