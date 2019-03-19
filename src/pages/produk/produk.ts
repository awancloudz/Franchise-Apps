import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,Platform, ActionSheetController, LoadingController ,ToastController,AlertController, PopoverController,normalizeURL } from 'ionic-angular';

//Tambahkan Provider
import { ProdukserviceProvider } from '../../providers/produkservice/produkservice';
//Tambahkan Variabel Global
import { ProdukArray } from '../../pages/produk/produkarray';
//Camera
import {Camera, CameraOptions} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { ImageuploadPage } from '../imageupload/imageupload';
import { ImagezoomPage } from '../imagezoom/imagezoom';
import { PencarianprodukPage } from '../pencarianproduk/pencarianproduk';

@IonicPage()
@Component({
  selector: 'page-produk',
  templateUrl: 'produk.html',
})
export class ProdukPage {
  id:Number;
  id_kategori:String;
  kodeproduk:String;
  namaproduk:String;
  stok:Number;
  harga:Number;
  diskon:Number;
  foto:String;
  items:ProdukArray[]=[];

  constructor ( public navCtrl: NavController,
                public navParams: NavParams,
                private modalController: ModalController,
                public nav: NavController,
                public platform: Platform,
                public actionSheetCtrl: ActionSheetController,
                public alertCtrl: AlertController,
                public loadincontroller:LoadingController,
                public _toast:ToastController,
                public produkservice:ProdukserviceProvider) {
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
      content:"Loading Produk..."
    });
    loadingdata.present();
    //Tampilkan data dari server
    this.produkservice.tampilkanproduk().subscribe(
      //Jika data sudah berhasil di load
      (data:ProdukArray[])=>{
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
            this.produkservice.hapusproduk(item).subscribe(
              (data:any)=>{
                let mes=this._toast.create({
                message:'Data dihapus',
                duration:1000,
                position:'top'
                });
                //this.items.splice(this.items.indexOf(item),1);
                mes.present();
                this.nav.setRoot(ProdukPage);
              }
            );
            //End Hapus Item
          }
        }
      ]
    });
    confirm.present();
  }

  produkedit(item) {
    this.nav.push (ProdukeditPage, {item: item});
  }

  produkcreate () {
    this.nav.push (ProdukcreatePage);
  }

  pencarianproduk () {
    this.nav.push (PencarianprodukPage);
  }

}

@Component({
  selector: 'page-produk',
  templateUrl: 'produk-edit.html',
})
export class ProdukeditPage {
  //Foto Produk
  public photos : any;
  public imageURI:any;
  public imageFileName:any;
  gbawal:String;
  item;
  id:Number;
  id_kategori:Number;
  kodeproduk:String;
  namaproduk:String;
  stok:Number;
  harga:Number;
  diskon:Number;
  foto:String;
  items:ProdukArray[]=[];
  constructor(public navCtrl: NavController,public params: NavParams,private modalController: ModalController,
    public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public produkservice:ProdukserviceProvider,private camera: Camera,private transfer: FileTransfer,
    private file: File,private filePath: FilePath) {
    this.item = params.data.item;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }

  ionViewDidLoad() {
    this.kodeproduk = this.item.kodeproduk;
    this.namaproduk = this.item.namaproduk;
    this.stok = this.item.stok;
    this.harga = this.item.harga;
    this.diskon = this.item.diskon;
    this.foto = this.item.foto;
    this.photos = [];
    this.gbawal = "http://localhost:8000/fotoupload/" + this.item.foto;
    this.photos.push(this.gbawal);
  }
  updateproduk(item){
    //Pemberitahuan
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Update Produk Sukses',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.nav.setRoot(ProdukPage);
          }
        }
      ]
    });
    //Loading bar
    let loadingdata=this.loadincontroller.create({
      content:"Proses Update..."
    });
    let info = this.alertCtrl.create({
      title: 'Tidak Terhubung ke server',
      message: 'Silahkan Periksa koneksi internet anda...',
    });
    loadingdata.present();
    //Tampilkan data dari server
    this.produkservice.editproduk(new ProdukArray(this.item.id,this.item.id_kategori,this.kodeproduk,this.namaproduk,this.stok,this.harga,this.diskon,this.foto))
    .subscribe(
      //Jika data sudah berhasil di load
      (data:ProdukArray[])=>{
        this.items=data;
        if(this.foto != this.item.foto){
          this.uploadFile();
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
        alert.present();
      }
    );
  }
  takeFoto(source: any) {
    const options : CameraOptions = {
      quality: 25, // picture quality
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: source,
    }
    this.camera.getPicture(options).then((imageData) => {
        //Convert Path
        this.filePath.resolveNativePath(imageData)
          .then((imagePath) => {
            //Push Array
            var nama = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            this.imageURI = normalizeURL(imagePath);
            this.photos.splice(0, 1);
            this.photos.push(this.imageURI);
            this.photos.reverse();
            this.foto = "produk_" + nama;
        });
      }, (err) => {
        console.log(err);
        this.presentToast(err);
    });
  }
  uploadFile() {
    let loader1 = this.loadincontroller.create({
      content: "Uploading Foto Produk..."
    });
    loader1.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let options: FileUploadOptions = {
      fileKey: 'file',
      params: {'fotoproduk' : this.foto},
      fileName: 'image.jpg',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
    
    fileTransfer.upload(this.imageURI, 'http://localhost:8000/api/uploadproduk', options)
      .then((data) => {
      this.imageFileName = "image.jpg";
      loader1.dismiss();
      this.presentToast("Upload Foto Produk Sukses");
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
  imageupload(){
    let imageupload = this.modalController.create (ImageuploadPage);
    imageupload.present();

    imageupload.onDidDismiss(data => {
      if(data != 0){
        this.takeFoto(data);
      }
      else{
        console.log("Close Button");
      }
    });
  }
  imagezoom (item) {
    let imagezoom = this.modalController.create (ImagezoomPage, {item: item});
    imagezoom.present();
  }
}

@Component({
  selector: 'page-produk',
  templateUrl: 'produk-create.html',
})
export class ProdukcreatePage {
  //Foto Produk
  public photos : any;
  public imageURI:any;
  public imageFileName:any;
  gbawal:String;
  item;
  id:Number;
  id_kategori:Number;
  kodeproduk:String;
  namaproduk:String;
  stok:Number;
  harga:Number;
  diskon:Number;
  foto:String;
  items:ProdukArray[]=[];
  constructor(public navCtrl: NavController,public params: NavParams,private modalController: ModalController,
    public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,public alertCtrl: AlertController,
    public loadincontroller:LoadingController,public _toast:ToastController,public produkservice:ProdukserviceProvider,private camera: Camera,private transfer: FileTransfer,
    private file: File,private filePath: FilePath) {
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }

  ionViewDidLoad() {
  }
  ngOnInit() {
    this.photos = [];
    this.gbawal = "login_image/photo_placeholder.png";
    this.photos.push(this.gbawal);
  }
  inputproduk(item){
    this.id_kategori = 1;
    //Pemberitahuan
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: 'Input Produk Sukses',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.nav.setRoot(ProdukPage);
          }
        }
      ]
    });
    //Loading bar
    let loadingdata=this.loadincontroller.create({
      content:"Proses Input..."
    });
    let info = this.alertCtrl.create({
      title: 'Tidak Terhubung ke server',
      message: 'Silahkan Periksa koneksi internet anda...',
    });
    let kosong = this.alertCtrl.create({
      title: 'Foto Produk',
      message: 'Silahkan upload foto produk terlebih dahulu..',
    });
  if(this.foto != "login_image/photo_placeholder.png"){
    loadingdata.present();
    //Tampilkan data dari server
    this.produkservice.tambahproduk(new ProdukArray(this.id,this.id_kategori,this.kodeproduk,this.namaproduk,this.stok,this.harga,this.diskon,this.foto))
    .subscribe(
      //Jika data sudah berhasil di load
      (data:ProdukArray[])=>{
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
  takeFoto(source: any) {
    const options : CameraOptions = {
      quality: 25, // picture quality
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: source,
    }
    this.camera.getPicture(options).then((imageData) => {
        //Convert Path
        this.filePath.resolveNativePath(imageData)
          .then((imagePath) => {
            //Push Array
            var nama = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            this.imageURI = normalizeURL(imagePath);
            this.photos.splice(0, 1);
            this.photos.push(this.imageURI);
            this.photos.reverse();
            this.foto = "produk_" + nama;
        });
      }, (err) => {
        console.log(err);
        this.presentToast(err);
    });
  }
  uploadFile() {
    let loader1 = this.loadincontroller.create({
      content: "Uploading Foto Produk..."
    });
    loader1.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let options: FileUploadOptions = {
      fileKey: 'file',
      params: {'fotoproduk' : this.foto},
      fileName: 'image.jpg',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
    
    fileTransfer.upload(this.imageURI, 'http://localhost:8000/api/uploadproduk', options)
      .then((data) => {
      this.imageFileName = "image.jpg";
      loader1.dismiss();
      this.presentToast("Upload Foto Produk Sukses");
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

  imageupload () {
    let imageupload = this.modalController.create (ImageuploadPage);
    imageupload.present();

    imageupload.onDidDismiss(data => {
      if(data != 0){
        this.takeFoto(data);
      }
      else{
        console.log("Close Button");
      }
    });
    }
    imagezoom (item) {
      let imagezoom = this.modalController.create (ImagezoomPage, {item: item});
      imagezoom.present();
    }
}
