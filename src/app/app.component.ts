import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ToastController, ModalController, LoadingController, normalizeURL } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
//Camera
import {Camera, CameraOptions} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { HomePage, HomeDetailPage, HomethumbnailPage, HomeprodukdetailPage, HometokoPage, HomechatPage, HomekomentarPage, HomekomentardetailPage, HomeuserPage, HomeratingPage } from '../pages/home/home';
import { KategoriPage,KategoriDetailPage } from '../pages/kategori/kategori';
import { PenjualanPage, PenjualandetailPage} from '../pages/penjualan/penjualan';
import { PembelianPage,PembelianDetailPage,PembelianKonfirmasiPage } from '../pages/pembelian/pembelian';
import { ProdukPage, ProdukeditPage, ProdukcreatePage } from '../pages/produk/produk';
import { MitraPage, MitradetailPage } from '../pages/mitra/mitra';
import { DompetPage } from '../pages/dompet/dompet';
import { PesanPage,PesanDetailPage } from '../pages/pesan/pesan';
import { SettingPage } from '../pages/setting/setting';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage, ForgotPage, DaftarPage, InformasipendaftaranPage} from '../pages/login/login';
import { KeranjangPage } from '../pages/keranjang/keranjang';
import { SearchPage } from '../pages/search/search';
import { TokoPage } from '../pages/toko/toko';
import { TokokategoriPage } from '../pages/tokokategori/tokokategori';
import { TokokeranjangPage } from '../pages/tokokeranjang/tokokeranjang';
import { TokopemesananPage,TokopemesananDetailPage } from '../pages/tokopemesanan/tokopemesanan';
import { TokopenjualanPage,TokopenjualanDetailPage } from '../pages/tokopenjualan/tokopenjualan';
import { TokoprodukPage, TokoprodukCreatePage } from '../pages/tokoproduk/tokoproduk';
import { TokoCreatePage,TokoprofilePage } from '../pages/tokoprofile/tokoprofile';
import { TokosearchPage } from '../pages/tokosearch/tokosearch';
import { FilterPage } from '../pages/filter/filter';
import { ImageuploadPage } from '../pages/imageupload/imageupload';
import { ImagezoomPage } from '../pages/imagezoom/imagezoom';
import { DaftarkurirPage } from '../pages/daftarkurir/daftarkurir';
import { InformasitokoPage } from '../pages/informasitoko/informasitoko';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //Foto Profile
  public photos : any;
  public imageURI:any;
  public imageFileName:any;
  gbawal:String;
  id:Number;
  fotoprofile:String;

  rootPage: any = LoginPage;
  level = "";
  pages_admin: Array<{title: string, icon: string,component: any}>;
  pages_mitra: Array<{title: string, icon: string,component: any}>;
  user: Array<{id: Number,nama: string,fotoprofile: string}>;

  constructor ( private storage: Storage,
                public platform: Platform,
                public statusBar: StatusBar, 
                public splashScreen: SplashScreen,
                private oneSignal: OneSignal,
                private events: Events,
                private modalController: ModalController,
                public _toast:ToastController,
                public loadincontroller:LoadingController,
                private camera: Camera,
                private transfer: FileTransfer,
                private file: File) {
                this.initializeApp();
                this.listenToLoginEvents();

    // used for an example of ngFor and navigation
    this.pages_admin = [
      //{ title: 'Home', icon: "sidemenu_icon/home.png", component: HomePage },
      { title: 'Penjualan', icon: "sidemenu_icon/penjualan.png", component: PenjualanPage },
      { title: 'Produk', icon: "sidemenu_icon/produk.png", component: ProdukPage },
      { title: 'Mitra', icon: "sidemenu_icon/mitra.png", component: MitraPage },
      { title: 'Logout',  icon: "sidemenu_icon/log_out.png", component: SettingPage },
    ];
    this.pages_mitra = [
      { title: 'Home', icon: "sidemenu_icon/home.png", component: HomePage },
      // { title: 'Kategori', icon: "sidemenu_icon/kategori.png", component: KategoriPage },
      { title: 'Pembelian', icon: "sidemenu_icon/pembelian.png", component: PembelianPage },
      { title: 'Profile',  icon: "sidemenu_icon/profile.png", component: ProfilePage },
      { title: 'Logout',  icon: "sidemenu_icon/log_out.png", component: SettingPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.oneSignal.startInit('1ad6386b-54f8-42b2-8cbd-d893468b9935', '379725851282');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });
        
      this.oneSignal.endInit();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  //Fungsi Deteksi Level User
  listenToLoginEvents() {
    this.events.subscribe('user:admin', (data) => {
      this.photos = [];
      this.level = "admin";
      for(var key in data)
      {
        this.user = [
          { id: data[key].id, nama: data[key].nama, fotoprofile: data[key].fotoprofile },
        ];
        this.gbawal = data[key].fotoprofile;
        this.id = data[key].id;
      }
      if(this.gbawal == ''){
        this.gbawal = "login_image/photo_placeholder.png";
        this.photos.push(this.gbawal);
      }
      else{
        this.gbawal = "http://localhost:8000/fotoupload/" + this.gbawal;
        this.photos.push(this.gbawal);
      }
    });
    this.events.subscribe('user:mitra', (data) => {
      this.photos = [];
      this.level = "mitra";
      for(var key in data)
      {
        this.user = [
          { id: data[key].id, nama: data[key].nama, fotoprofile: data[key].fotoprofile },
        ];
        this.gbawal = data[key].fotoprofile;
        this.id = data[key].id;
      }
      if(this.gbawal == ''){
        this.gbawal = "login_image/photo_placeholder.png";
        this.photos.push(this.gbawal);
      }
      else{
        this.gbawal = "http://localhost:8000/fotoupload/" + this.gbawal;
        this.photos.push(this.gbawal);
      }
    });
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
        var nama = imageData.substr(imageData.lastIndexOf('/') + 1);
        this.imageURI = normalizeURL(imageData);
        this.photos.splice(0, 1);
        this.photos.push(this.imageURI);
        this.photos.reverse();
        this.fotoprofile = "profile_" + nama;
        this.uploadFile();
      }, (err) => {
        console.log(err);
        this.presentToast(err);
    });
  }

  uploadFile() {
    let loader1 = this.loadincontroller.create({
      content: "Uploading Foto Profile..."
    });
    loader1.present();
    
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let options: FileUploadOptions = {
      fileKey: 'file',
      params: {'id' : this.id, 'fotoprofile' : this.fotoprofile},
      fileName: 'image.jpg',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
    
    fileTransfer.upload(this.imageURI, 'http://localhost:8000/api/uploadprofile', options)
      .then((data) => {
      this.imageFileName = "image.jpg";
      loader1.dismiss();
      this.presentToast("Upload Foto Profile Sukses");
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

  imagezoom (item2) {
    let imagezoom = this.modalController.create (ImagezoomPage, {item: item2});
    imagezoom.present();
  }
}
