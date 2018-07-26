import { Component } from '@angular/core';
import { Events,IonicPage, NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController  } from 'ionic-angular';
import { TokoprofileserviceProvider } from '../../providers/tokoprofileservice/tokoprofileservice';
import { TokoProfileArray } from '../../pages/tokoprofile/tokoprofilearray';
import { HomeserviceProvider } from '../../providers/homeservice/homeservice';
import { HomeArray2 } from '../../pages/home/homearray2';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { TokoPage } from '../../pages/toko/toko';
//Camera
import {Camera, CameraOptions} from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
/**
 * Generated class for the TokoprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tokoprofile',
  templateUrl: 'tokoprofile.html',
})
export class TokoprofilePage {
  public photos_awal : any;
  public photos : any;
  public imageURI:any;
  public imageFileName:any;

  items:TokoProfileArray[]=[];
  id:Number;
  id_warga:Number;
  kodetoko:String;
  namatoko:String;
  alamat:String;
  status:Number;
  foto:String;
  app_id: String;
  id_toko:Number;

  constructor(public platform:Platform,params: NavParams,public nav: NavController,
    public loadincontroller:LoadingController,public profileservice:TokoprofileserviceProvider,
    public _toast:ToastController,public alertCtrl: AlertController,private storage: Storage,
    private fileChooser: FileChooser,private camera: Camera,private transfer: FileTransfer,
    private events: Events,private file: File,public oneSignal: OneSignal,public homeservice:HomeserviceProvider) {
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
      this.photos_awal = [];
      this.photos = [];
  }

  //Tampil data awal
  ionViewDidLoad() {
    //Ambil data ID dari storage
    this.storage.get('id_user').then((val) => {
      //Loading bar
      let loadingdata=this.loadincontroller.create({
        content:"Loading..."
      });
      let info = this.alertCtrl.create({
        title: 'Tidak Terhubung ke server',
        message: 'Silahkan Periksa koneksi internet anda...',
      });
      loadingdata.present();
      //Tampilkan data dari server
      this.profileservice.tampilkanprofile(val).subscribe(
        //Jika data sudah berhasil di load
        (data:TokoProfileArray[])=>{
          this.items=data;
          for(var key in data)
          {
            this.id = data[key].id;
            this.id_warga = data[key].id_warga;
            this.kodetoko = data[key].kodetoko;
            this.namatoko = data[key].namatoko;
            this.alamat = data[key].alamat;
            this.status = data[key].status;
            this.storage.set('id_toko', data[key].id);
            //Check App ID Notifikasi
            this.oneSignal.getIds().then((ids) => {
              this.app_id = ids.userId;
              this.id_toko = data[key].id;
                //Cek + Simpan Perangkat
                this.homeservice.tambahperangkat2(new HomeArray2(this.id,this.id_toko,this.app_id))
                .subscribe(
                  (data:HomeArray2)=>{
                  },
                  function(error){
                  },
                  function(){
                  }
                );
                //End Cek simpan perangkat
            });
            //End Cek App ID

            //Push Foto dari Server ke Lokal
            this.photos_awal.push(data[key].foto);
            this.downloadImage(this.photos_awal);
          }
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
        }
      );
    });
  }
  downloadImage(photos_awal) {
    photos_awal.forEach(element => {
      this.platform.ready().then(() => {
        const fileTransfer:FileTransferObject = this.transfer.create();
        const imageLocation = `http://localhost:8000/fotoupload/${element}`;
        this.photos.push(imageLocation);
        /*fileTransfer.download(imageLocation, this.file.applicationDirectory + element).then((entry) => {
          this.photos.push(entry.toURL());
        }, (error) => {

        });*/
      });
    });
  }
  takePhoto() {
    const options : CameraOptions = {
      quality: 25, // picture quality
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((imageData) => {
        this.imageURI = imageData;
        this.photos.splice(0, 1);
        this.photos.push(this.imageURI);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
        this.presentToast(err);
    });
  }
  uploadFile() {
    let loader = this.loadincontroller.create({
      content: "Uploading Foto..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let options: FileUploadOptions = {
      fileKey: 'file',
      params: {'foto' : this.foto},
      fileName: 'image.jpg',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
    
    fileTransfer.upload(this.imageURI, 'http://localhost:8000/api/uploadtoko', options)
      .then((data) => {
      this.imageFileName = "image.jpg";
      loader.dismiss();
      this.presentToast("Upadate Foto Sukses");
    }, (err) => {
      console.log(err);
      loader.dismiss();
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
      
    });
  
    toast.present();
  }
  editprofile(lama:TokoProfileArray,baru:TokoProfileArray){
    //Pemberitahuan
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Edit Data Sukses',
      buttons: ['OK']
    });
    //Loading Data
    let loadingdata=this.loadincontroller.create({
        content:"Mengubah Data..."
    });
    let info = this.alertCtrl.create({
      title: 'Tidak Terhubung ke server',
      message: 'Silahkan Periksa koneksi internet anda...',
    });
    loadingdata.present();
    this.foto = "toko_" + this.id_warga + ".jpg";
    //Mengambil value dari edit field untuk dimasukkan ke UsulanArray
    this.profileservice.editdataprofile(new TokoProfileArray(this.id,this.id_warga,this.kodetoko,this.namatoko,this.alamat,this.foto,this.status))
    .subscribe(
      (data:any)=>{
        this.uploadFile();
        //Kirim Variable UsulanArray ke Usulanservice.ts
        if(data.affectedRows==1)
        {
          this.items[this.items.indexOf(lama)]=baru;
        }
        loadingdata.dismiss();
      },
      function(error){
        //Jika Koneksi Tidak ada
        if(error.status == 0){
          info.present();
        }
        loadingdata.dismiss(); 
      },
      function(){
        alert.present();
      }
    );  
  }
}

@Component({
  selector: 'page-tokocreate',
  templateUrl: 'toko-create.html',
})
export class TokoCreatePage {
  //Foto
  public photos : any;
  public imageURI:any;
  public imageFileName:any;

  gbawal:String;
  id:Number;
  id_warga:Number;
  kodetoko:String;
  namatoko:String;
  alamat:String;
  status:Number;
  foto:String;

  constructor(public platform:Platform,params: NavParams,public nav: NavController,
    public loadincontroller:LoadingController,public tokoprofileservice:TokoprofileserviceProvider,
    public _toast:ToastController,public alertCtrl: AlertController,private storage: Storage,
    private camera: Camera,private transfer: FileTransfer,private events: Events) {
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

  ngOnInit() {
    this.photos = [];
    this.gbawal = "assets/imgs/ecommerce.jpg";
    this.photos.push(this.gbawal);
    this.storage.get('id_user').then((warga) => {
      this.id_warga = warga;
      this.kodetoko = warga;
      this.status = 1;
    });
  }
  takePhoto() {
    const options : CameraOptions = {
      quality: 25, // picture quality
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((imageData) => {
        this.imageURI = imageData;
        this.photos.splice(0, 1);
        this.photos.push(this.imageURI);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
        this.presentToast(err);
    });
  }
  uploadFile() {
    let loader = this.loadincontroller.create({
      content: "Uploading Foto..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let options: FileUploadOptions = {
      fileKey: 'file',
      params: {'foto' : this.foto},
      fileName: 'image.jpg',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
    
    fileTransfer.upload(this.imageURI, 'http://localhost:8000/api/uploadtoko', options)
      .then((data) => {
      this.imageFileName = "image.jpg";
      loader.dismiss();
      this.presentToast("Upload Foto Sukses");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }
  daftartoko(){
    let sukses = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Pendaftaran Sukses,anda sekarang sudah punya Toko Online.',
    });
    let info = this.alertCtrl.create({
      title: 'Tidak Terhubung ke server',
      message: 'Silahkan Periksa koneksi internet anda...',
    });
    //Loading Data
    let loadingdata=this.loadincontroller.create({
        content:"Proses Pendaftaran..."
    });

    loadingdata.present();

    if(this.photos != "assets/imgs/ecommerce.jpg"){
      this.foto = "toko_" + this.id_warga + ".jpg";
    }
    this.tokoprofileservice.daftartoko(new TokoProfileArray(this.id,this.id_warga,this.kodetoko,this.namatoko,this.alamat,this.foto,this.status))
    .subscribe(
      (data:TokoProfileArray)=>{
        if(this.photos != "assets/imgs/ecommerce.jpg"){
          this.uploadFile();
        }
        this.storage.get('nama_warga').then((nama) => {
          this.events.publish('user:toko',nama);
          this.storage.set('status_toko', 1);
        });
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
}
