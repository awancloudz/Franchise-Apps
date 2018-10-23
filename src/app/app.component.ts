import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { HomePage, HomeDetailPage, HomethumbnailPage, HomeprodukdetailPage, HometokoPage, HomechatPage, HomekomentarPage, HomekomentardetailPage, HomeuserPage, HomeratingPage } from '../pages/home/home';
import { KategoriPage,KategoriDetailPage } from '../pages/kategori/kategori';
import { PembelianPage,PembelianDetailPage } from '../pages/pembelian/pembelian';
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
  level = "warga";
  pages: Array<{title: string, icon: string,component: any}>;
  warga: Array<{nama: string}>;

  constructor(private storage: Storage,public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen,private oneSignal: OneSignal,private events: Events) {
    this.initializeApp();
    this.listenToLoginEvents();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: "sidemenu_icon/home.png", component: HomePage },
      { title: 'Kategori', icon: "sidemenu_icon/kategori.png", component: KategoriPage },
      { title: 'Pembelian', icon: "sidemenu_icon/pembelian.png", component: PembelianPage },
      //{ title: 'Dompet', icon: "sidemenu_icon/home.png", component: DompetPage },
      //{ title: 'Pesan', icon: "sidemenu_icon/home.png", component: PesanPage },
      //{ title: 'Setting', icon: "sidemenu_icon/home.png", component: SettingPage },
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

      this.oneSignal.startInit('b842e2bc-4de5-4cd7-b808-142b2917496f', '672351446553');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
        if(this.level == "warga"){
          this.nav.setRoot(PembelianPage);
        }
        else if(this.level == "toko"){
          this.nav.setRoot(TokoPage);
        }
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

    this.events.subscribe('user:warga', (data) => {
      this.level = "warga";
      this.warga = [
        { nama: data },
      ];
    });

    this.events.subscribe('user:toko', (data) => {
      this.level = "toko";
      this.warga = [
        { nama: data },
      ];
    });
  }
  tomboltoko () {
    this.nav.setRoot (TokoPage);
  }
  daftartoko () {
    this.nav.setRoot (TokoCreatePage);
  }
}
