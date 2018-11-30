import { Component } from '@angular/core';
import { Events,NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController,normalizeURL } from 'ionic-angular';
//import { WebView } from '@ionic-native/ionic-webview/ngx';
//Tambahkan Provider
import { LoginserviceProvider } from '../../providers/loginservice/loginservice';
//Tambahkan Variabel Global
import { LoginArray } from '../../pages/login/loginarray';
import { DaftarArray } from '../../pages/login/daftararray';
//Set direktori redirect * Wajib *
import { HomePage } from '../../pages/home/home';
import { PenjualanPage } from '../../pages/penjualan/penjualan';
import { Storage } from '@ionic/storage';
//Tambahkan Provider
import { HomeserviceProvider } from '../../providers/homeservice/homeservice';
//Tambahkan Variabel Global
import { HomeArray } from '../../pages/home/homearray';
import { OneSignal } from '@ionic-native/onesignal';
//Camera
import {Camera, CameraOptions} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  templateUrl: 'login.html',
  //Set komponen * Wajib *
  entryComponents:[ HomePage ], 
})
export class LoginPage {
  items:LoginArray[]=[];
  email:String;
  password:String;
  id:Number;
  id_users: Number;
  app_id: String;
  constructor(public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public loadincontroller:LoadingController,public loginservice:LoginserviceProvider,public _toast:ToastController,
    public alertCtrl: AlertController,private storage: Storage,private events: Events,
    public homeservice:HomeserviceProvider,public oneSignal: OneSignal) {
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
  this.storage.get('level').then((val) => {
    this.storage.get('email_user').then((email) => {
      this.storage.get('password').then((password) => {
        if((email != null) && (password != null)){
          this.email = email;
          this.password = password;
          this.ceklogin();
        }
      });
    });
  });
}
//Cek Data Login
ceklogin(){
  //Pemberitahuan
  let gagal = this.alertCtrl.create({
    title: 'Informasi',
    subTitle: 'Login Gagal, cek Email/Password.',
    buttons: ['OK']
  });
  //Loading Data
  let loadingdata=this.loadincontroller.create({
      content:"Proses Login..."
  });
  let info = this.alertCtrl.create({
    title: 'Tidak Terhubung ke server',
    message: 'Silahkan Periksa koneksi internet anda...',
  });
  loadingdata.present();
  //Mengambil value dari input field untuk dimasukkan ke UsulanArray
  this.loginservice.loginuser(new LoginArray(this.email,this.password))
  .subscribe(
    (data:LoginArray)=>{
      //Seleksi Data dari server
      for(var key in data)
      {
         if((data[key].email != null) && (data[key].password != null)){
            //Redirect menuju ke root HomePage * Wajib *
            this.storage.set('id_user', data[key].id);
            this.storage.set('nama_user', data[key].nama);
            this.storage.set('email_user', data[key].email);
            this.storage.set('password', this.password);
            this.storage.set('level', data[key].level);
            if(data[key].level == 'admin'){
              this.events.publish('user:admin',data);
              //set bulan ini
              var sekarang = new Date();
              var tanggal = sekarang, tahun = tanggal.getFullYear(), bulan = tanggal.getMonth();
              var awalbulan = new Date(tahun, bulan, 1);
              
              this.storage.set('tanggal_awal', this.formatDate(awalbulan));
              this.storage.set('tanggal_akhir', this.formatDate(sekarang));
              //Redirect Home
              this.nav.setRoot(PenjualanPage);
            }
            else if(data[key].level == 'mitra'){
              this.events.publish('user:mitra',data);
              //Redirect
              this.nav.setRoot(HomePage);
            }
            
            //Check App ID Notifikasi
            this.oneSignal.getIds().then((ids) => {
              this.app_id = ids.userId;
              this.id_users = data[key].id;
                //Cek + Simpan Perangkat
                this.homeservice.tambahperangkat(new HomeArray(this.id,this.id_users,this.app_id))
                .subscribe(
                  (data:HomeArray)=>{
                  },
                  function(error){
                  },
                  function(){
                  }
                );
                //End Cek simpan perangkat
            });
            //End Cek App ID
         }
         else{
           gagal.present();
         }
      }
    },
    function(error){
      //Jika Koneksi Tidak ada
      if(error.status == 0){
        info.present();
      }
      loadingdata.dismiss();
    },
    function(){
    //Sembunyikan Loading
      loadingdata.dismiss();
    }
  );
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
daftar(){
  this.nav.push(DaftarPage);
}

lupapassword(){
  this.nav.push(ForgotPage);
}

informasipendaftaran (){
  this.nav.push(InformasipendaftaranPage);
}

}

@Component({
  templateUrl: 'daftar.html',
})
export class DaftarPage {
  //KTP
  public photos : any;
  public imageURI:any;
  public imageFileName:any;
  //Wajah + KTP
  public photos2 : any;
  public imageURI2:any;
  public imageFileName2:any;

  gbawal:String;
  gbawal2:String;
  items:LoginArray[]=[];
  id:Number;
  alamat:String;
  kota:String;
  nama:String;
  email:String;
  password:String;
  level:String;
  status:Number;
  nohp:String;
  fotoktp:String;
  fotowajah:String;
  constructor(
    public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public loadincontroller:LoadingController,public loginservice:LoginserviceProvider,public _toast:ToastController,
    public alertCtrl: AlertController,private storage: Storage,private camera: Camera,private transfer: FileTransfer,
    private file: File) {
      //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }

ngOnInit() {
  this.photos = [];
  this.gbawal = "login_image/photo_placeholder.png";
  this.photos.push(this.gbawal);

  this.photos2 = [];
  this.gbawal2 = "login_image/photo_placeholder.png";
  this.photos2.push(this.gbawal2);
}

takeKTP() {
  const options : CameraOptions = {
    quality: 25, // picture quality
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  }
  this.camera.getPicture(options).then((imageData) => {
      var nama = imageData.substr(imageData.lastIndexOf('/') + 1);
      // var path = imageData.substr(0, imageData.lastIndexOf('/') + 1);
      // this.file.copyFile(path, nama, this.file.dataDirectory, "ktp.jpg");
      // var gantiurl = this.file.dataDirectory + "ktp.jpg";
      //this.imageURI = this.webview.convertFileSrc(imageData);
      this.imageURI = normalizeURL(imageData);
      this.photos.splice(0, 1);
      this.photos.push(this.imageURI);
      this.photos.reverse();
      this.fotoktp = "ktp_" + nama;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
  });
}

takeWajah(){
  const options : CameraOptions = {
    quality: 25, // picture quality
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection: 1,
  }
  this.camera.getPicture(options).then((imageData2) => {
      var nama = imageData2.substr(imageData2.lastIndexOf('/') + 1);
      this.imageURI2 = normalizeURL(imageData2);
      this.photos2.splice(0, 1);
      this.photos2.push(this.imageURI2);
      this.photos2.reverse();
      this.fotowajah = "wajah_" + nama;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
  });
}

uploadFile() {
  let loader1 = this.loadincontroller.create({
    content: "Uploading KTP..."
  });
  loader1.present();
  const fileTransfer: FileTransferObject = this.transfer.create();
  
  let options: FileUploadOptions = {
    fileKey: 'file',
    params: {'fotoktp' : this.fotoktp},
    fileName: 'image.jpg',
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers: {}
  }
  
  fileTransfer.upload(this.imageURI, 'http://localhost:8000/api/uploadktp', options)
    .then((data) => {
    this.imageFileName = "image.jpg";
    loader1.dismiss();
    this.presentToast("Upload KTP Sukses");
  }, (err) => {
    console.log(err);
    loader1.dismiss();
    this.presentToast(err);
  });
}

uploadFile2() {
  let loader2 = this.loadincontroller.create({
    content: "Uploading Selfie & KTP..."
  });
  loader2.present();
  const fileTransfer2: FileTransferObject = this.transfer.create();
  
  let options2: FileUploadOptions = {
    fileKey: 'file2',
    params: {'fotowajah' : this.fotowajah },
    fileName: 'image.jpg',
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers: {}
  }
  
  fileTransfer2.upload(this.imageURI2, 'http://localhost:8000/api/uploadwajah', options2)
    .then((data2) => {
    this.imageFileName2 = "image.jpg";
    loader2.dismiss();
    this.presentToast("Upload Selfie & KTP Sukses");
  }, (err) => {
    console.log(err);
    loader2.dismiss();
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

//Cek Data Pendaftaran
cekdaftar(){
  //Pemberitahuan
  let kosong = this.alertCtrl.create({
    title: 'Informasi',
    subTitle: 'Harap Upload Foto KTP / Selfie terlebih dahulu.',
    buttons: ['OK']
  });
  let sukses = this.alertCtrl.create({
    title: 'Informasi',
    subTitle: 'Pendaftaran Sukses,konfirmasi pendaftaran akan dikirim lewat SMS/Email.',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          this.nav.setRoot(LoginPage);
        }
      }
    ]
  });
  let gagal = this.alertCtrl.create({
    title: 'Informasi',
    subTitle: 'Email sudah pernah terdaftar sebelumnya.',
    buttons: ['OK']
  });
  let info = this.alertCtrl.create({
    title: 'Tidak Terhubung ke server',
    message: 'Silahkan Periksa koneksi internet anda...',
  });
  //Loading Data
  let loadingdata=this.loadincontroller.create({
      content:"Proses Verifikasi..."
  });
  loadingdata.present();
  //Mengambil value dari input field untuk dimasukkan ke Array
  this.loginservice.cekdaftar(new LoginArray(this.email,this.password))
  .subscribe(
    (data:DaftarArray)=>{
      //Seleksi Data dari server
      for(var key in data)
      { 
        //Cek Email
        if(data[key].email == null){
          //Cek FOto
          if((this.photos != "login_image/photo_placeholder.png") && (this.photos2 != "login_image/photo_placeholder.png")){
            //Set status awal
            this.level = "mitra";
            this.status = 1;
            
            loadingdata.present();
            this.loginservice.daftaruser(new DaftarArray(this.id,this.nama,this.alamat,this.kota,this.email,this.level,this.status,this.fotoktp,this.fotowajah,this.nohp))
            .subscribe(
              (data:DaftarArray)=>{
                this.uploadFile();
                this.uploadFile2();
              },
              function(error){
                //Jika Koneksi Tidak ada
                if(error.status == 0){
                  info.present();
                }
                loadingdata.dismiss();
              },
              function(){
                //Jika Sukses
                loadingdata.dismiss();
                sukses.present();
              }
            );

          }
          else{
            kosong.present();
          }
        }
        else{
          gagal.present();
        }
      }
    },
    function(error){
      //Jika Koneksi Tidak ada
      if(error.status == 0){
        info.present();
      }
      loadingdata.dismiss();
    },
    function(){
    //Sembunyikan Loading
      loadingdata.dismiss();
    }
  );
}
login(){
  this.nav.setRoot(LoginPage);
}
}

@Component({
  templateUrl: 'forgot.html',
  //Set komponen * Wajib *
  entryComponents:[ LoginPage ], 
})
export class ForgotPage {

  constructor(
    public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public loadincontroller:LoadingController,public loginservice:LoginserviceProvider,public _toast:ToastController,
    public alertCtrl: AlertController) {
      //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }

ceklupa(){
  
}
}

@Component({
  templateUrl: 'informasi-pendaftaran.html',
})

export class InformasipendaftaranPage {

  constructor(
    public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public loadincontroller:LoadingController,public loginservice:LoginserviceProvider,public _toast:ToastController,
    public alertCtrl: AlertController) {
  }

}
