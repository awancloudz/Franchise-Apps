import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { HomePage, HomeDetailPage, HomethumbnailPage, HomeprodukdetailPage, HometokoPage, HomechatPage, HomekomentarPage, HomekomentardetailPage, HomeuserPage, HomeratingPage } from '../pages/home/home';
import { KategoriPage,KategoriDetailPage } from '../pages/kategori/kategori';
import { PenjualanPage, PenjualandetailPage} from '../pages/penjualan/penjualan';
import { PembelianPage,PembelianDetailPage,PembelianKonfirmasiPage } from '../pages/pembelian/pembelian';
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
import { SortPage } from '../pages/sort/sort';
import { DaftarkurirPage } from '../pages/daftarkurir/daftarkurir';
import { InformasitokoPage } from '../pages/informasitoko/informasitoko';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  level = "";
  pages_admin: Array<{title: string, icon: string,component: any}>;
  pages_mitra: Array<{title: string, icon: string,component: any}>;
  user: Array<{nama: string}>;

  constructor(private storage: Storage,public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen,private oneSignal: OneSignal,private events: Events) {
    this.initializeApp();
    this.listenToLoginEvents();

    // used for an example of ngFor and navigation
    this.pages_admin = [
      { title: 'Home', icon: "sidemenu_icon/home.png", component: HomePage },
      { title: 'Penjualan', icon: "sidemenu_icon/penjualan.png", component: PenjualanPage },
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
      this.level = "admin";
      this.user = [
        { nama: data },
      ];
    });
    this.events.subscribe('user:mitra', (data) => {
      this.level = "mitra";
      this.user = [
        { nama: data },
      ];
    });
  }
}
