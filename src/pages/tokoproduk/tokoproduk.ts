import { Component } from '@angular/core';
//Tambahkan Provider
import { TokoprodukserviceProvider } from '../../providers/tokoprodukservice/tokoprodukservice';
//Tambahkan Variabel Global
import { TokoprodukArray } from '../../pages/tokoproduk/tokoprodukarray';
import { NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController } from 'ionic-angular'
import { TokokategoriserviceProvider } from '../../providers/tokokategoriservice/tokokategoriservice';
//Camera
import {Camera, CameraOptions} from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TokoprodukPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tokoproduk',
  templateUrl: 'tokoproduk.html',
})
export class TokoprodukPage {
  items:TokoprodukArray[]=[];
  constructor(public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public tokoprodukservice:TokoprodukserviceProvider,private storage: Storage) {

  }

  //Tampil data awal
ionViewDidLoad() {
  //Loading bar
  let loadingdata=this.loadincontroller.create({
    content:"Loading..."
  });
  loadingdata.present();
  //Tampilkan data dari server
  this.storage.get('id_toko').then((toko) => {
  this.tokoprodukservice.tampilkanproduk(toko).subscribe(
    //Jika data sudah berhasil di load
    (data:TokoprodukArray[])=>{
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
  message: 'Yakin Menghapus Produk',
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
        this.tokoprodukservice.hapusproduk(item).subscribe(
          (data:any)=>{
            let mes=this._toast.create({
            message:'Data produk dihapus',
            duration:1000,
            position:'top'
            });
            this.items.splice(this.items.indexOf(item),1);
            mes.present();
            //this.nav.setRoot(TokoprodukPage);
          }
        );
        //End Hapus Item
      }
    }
  ]
});
confirm.present();
}
tokoprodukcreate(){
  this.nav.push(TokoprodukCreatePage);
}
}

@Component({
  templateUrl: 'tokoproduk-create.html',
})
export class TokoprodukCreatePage {
  //Camera
  public photos : any;
  public imageURI:any;
  public imageFileName:any;

  id:Number
  id_kategoriproduk:Number;
  id_subkategoriproduk:Number;
  id_toko:Number;
  kodeproduk:String;
  namaproduk:String;
  stok:Number;
  harga:Number;
  diskon:Number;
  items:TokoprodukArray[]=[];
  constructor(public params: NavParams,public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public tokoprodukservice:TokoprodukserviceProvider,
    private transfer: FileTransfer,private camera: Camera,private storage: Storage) {
      
  }

  //Simpan produk
  simpanproduk() {
    //Pemberitahuan
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Simpan Barang Sukses.',
      buttons: ['OK']
    });
    //Loading Data
    let loadingdata=this.loadincontroller.create({
        content:"Menambahkan produk..."
    });
    
    loadingdata.present();
    //Mengambil value dari input field untuk dimasukkan ke TokoprodukArray
  this.storage.get('id_toko').then((toko) => {
    this.tokoprodukservice.tambahproduk(new TokoprodukArray(this.id,this.id_kategoriproduk,this.id_subkategoriproduk,toko,this.kodeproduk,
    this.namaproduk,this.stok,this.harga,this.diskon))
    .subscribe(
      (data:TokoprodukArray)=>{
        //Push
        loadingdata.dismiss();
        this.nav.setRoot(TokoprodukPage);
      },
      function(error){
  
      },
      function(){
        alert.present();
      }
    );
  });
  }

  ngOnInit() {
    this.photos = [];
  }
  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
        title: 'Yakin Menghapus Foto Ini ?',
        message: '',
        buttons: [
          {
            text: 'Tidak',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Ya',
            handler: () => {
              console.log('Agree clicked');
              this.photos.splice(index, 1);
            }
          }
        ]
      });
    confirm.present();
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
        this.photos.push(this.imageURI);
        this.photos.reverse();
        this.uploadFile();
      }, (err) => {
        console.log(err);
        this.presentToast(err);
      });
  }

  uploadFile() {
    let loader = this.loadincontroller.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'file',
      params: {'id_toko' : this.id_toko },
      fileName: 'image.jpg',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://localhost:8000/api/uploadproduk', options)
      .then((data) => {
      this.imageFileName = "upload.jpg";
      loader.dismiss();
      this.presentToast("Upload Sukses");
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
      console.log('Tutup');
    });
  
    toast.present();
  }
}
