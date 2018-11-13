import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
//Mengambil modul http
import { HttpModule} from '@angular/http';
//Foto
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera} from '@ionic-native/camera';
//Push Notifications
import { OneSignal } from '@ionic-native/onesignal';
//WebView
//import { WebView } from '@ionic-native/ionic-webview/ngx';

import { MyApp } from './app.component';
import { HomePage, HomeDetailPage, HomethumbnailPage, HomeprodukdetailPage, HometokoPage, HomechatPage, HomekomentarPage, HomekomentardetailPage, HomeuserPage, HomeratingPage } from '../pages/home/home';
import { KategoriPage,KategoriDetailPage, KategoriDetailPage2 } from '../pages/kategori/kategori';
import { PenjualanPage, PenjualandetailPage } from '../pages/penjualan/penjualan';
import { PembelianPage,PembelianDetailPage,PembelianCreatePage,PembelianKonfirmasiPage } from '../pages/pembelian/pembelian';
import { MitraPage, MitradetailPage } from '../pages/mitra/mitra';
import { DompetPage } from '../pages/dompet/dompet';
import { PesanPage,PesanDetailPage } from '../pages/pesan/pesan';
import { SettingPage } from '../pages/setting/setting';
import { KeranjangPage,KeranjangcreatePage } from '../pages/keranjang/keranjang';
import { SearchPage } from '../pages/search/search';
import { TokoPage } from '../pages/toko/toko';
import { TokokategoriPage,TokokategoriDetailPage } from '../pages/tokokategori/tokokategori';
import { TokokeranjangPage,TokokeranjangPage2,TokokeranjangCreatePage,TokokeranjangCreatePage2 } from '../pages/tokokeranjang/tokokeranjang';
import { TokopemesananPage,TokopemesananDetailPage,TokopemesananCreatePage } from '../pages/tokopemesanan/tokopemesanan';
import { TokopenjualanPage,TokopenjualanDetailPage } from '../pages/tokopenjualan/tokopenjualan';
import { TokoprodukPage,TokoprodukCreatePage } from '../pages/tokoproduk/tokoproduk';
import { TokoprofilePage,TokoCreatePage } from '../pages/tokoprofile/tokoprofile';
import { TokosearchPage } from '../pages/tokosearch/tokosearch';
import { LoginPage, DaftarPage, ForgotPage, InformasipendaftaranPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { FilterPage } from '../pages/filter/filter';
import { SortPage } from '../pages/sort/sort';
import { DaftarkurirPage } from '../pages/daftarkurir/daftarkurir';
import { InformasitokoPage } from '../pages/informasitoko/informasitoko';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { KategoriserviceProvider } from '../providers/kategoriservice/kategoriservice';
import { KategoriPageModule } from '../pages/kategori/kategori.module';
import { KeranjangserviceProvider } from '../providers/keranjangservice/keranjangservice';
import { PembelianserviceProvider } from '../providers/pembelianservice/pembelianservice';
import { SearchserviceProvider } from '../providers/searchservice/searchservice';
import { TokoprodukserviceProvider } from '../providers/tokoprodukservice/tokoprodukservice';
import { TokokategoriserviceProvider } from '../providers/tokokategoriservice/tokokategoriservice';
import { TokopenjualanserviceProvider } from '../providers/tokopenjualanservice/tokopenjualanservice';
import { TokopemesananserviceProvider } from '../providers/tokopemesananservice/tokopemesananservice';
import { TokokeranjangserviceProvider } from '../providers/tokokeranjangservice/tokokeranjangservice';
import { TokosearchserviceProvider } from '../providers/tokosearchservice/tokosearchservice';
import { TokoprofileserviceProvider } from '../providers/tokoprofileservice/tokoprofileservice';
import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { HomeserviceProvider } from '../providers/homeservice/homeservice';
import { ProfileserviceProvider } from '../providers/profileservice/profileservice';

import { DompetPageModule } from '../pages/dompet/dompet.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { TokoprofilePageModule } from '../pages/tokoprofile/tokoprofile.module';
import { TokosearchPageModule } from '../pages/tokosearch/tokosearch.module';
import { PenjualanPageModule } from '../pages/penjualan/penjualan.module';
import { PembelianPageModule } from '../pages/pembelian/pembelian.module';
import { PesanPageModule } from '../pages/pesan/pesan.module';
import { SettingPageModule } from '../pages/setting/setting.module';
import { KeranjangPageModule } from '../pages/keranjang/keranjang.module';
import { SearchPageModule } from '../pages/search/search.module';
import { TokokategoriPageModule } from '../pages/tokokategori/tokokategori.module';
import { TokokeranjangPageModule } from '../pages/tokokeranjang/tokokeranjang.module';
import { TokopemesananPageModule } from '../pages/tokopemesanan/tokopemesanan.module';
import { TokopenjualanPageModule } from '../pages/tokopenjualan/tokopenjualan.module';
import { TokoprodukPageModule } from '../pages/tokoproduk/tokoproduk.module';
import { TokoPageModule } from '../pages/toko/toko.module';
import { FilterPageModule } from '../pages/filter/filter.module';
import { MitraPageModule } from '../pages/mitra/mitra.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage, HomeDetailPage, HomethumbnailPage, HomeprodukdetailPage, HometokoPage, HomechatPage, HomekomentarPage, HomekomentardetailPage, HomeuserPage, HomeratingPage,
    //FilterPage,
    //SortPage,
    //DaftarkurirPage,
    //InformasitokoPage,
    //PenjualanPage, PenjualandetailPage,
    //PembelianPage, PembelianDetailPage,PembelianCreatePage,
    //MitraPage, MitradetailPage,
    //DompetPage,
    //PesanPage, PesanDetailPage,
    //SettingPage,
    //KeranjangPage, KeranjangcreatePage,
    //SearchPage,
    //TokoPage,
    //TokokategoriPage,TokokategoriDetailPage,
    //TokokeranjangPage,TokokeranjangPage2,TokokeranjangCreatePage,TokokeranjangCreatePage2,
    //TokopemesananPage, TokopemesananDetailPage,TokopemesananCreatePage,
    //TokopenjualanPage, TokopenjualanDetailPage,
    //TokoprodukPage, TokoprodukCreatePage,
    //TokosearchPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    KategoriPageModule,
    LoginPageModule,
    DompetPageModule,
    ProfilePageModule,
    TokoprofilePageModule,
    PenjualanPageModule,
    PembelianPageModule,
    PesanPageModule,
    SettingPageModule,
    KeranjangPageModule,
    SearchPageModule,
    TokokategoriPageModule,
    TokokeranjangPageModule,
    TokopemesananPageModule,
    TokopenjualanPageModule,
    TokoprodukPageModule,
    TokosearchPageModule,
    TokoPageModule,
    FilterPageModule,
    MitraPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, HomeDetailPage, HomethumbnailPage, HomeprodukdetailPage, HometokoPage, HomechatPage, HomekomentarPage, HomekomentardetailPage, HomeuserPage, HomeratingPage,
    KategoriPage, KategoriDetailPage,KategoriDetailPage2,
    PenjualanPage, PenjualandetailPage,
    PembelianPage, PembelianDetailPage,PembelianCreatePage,PembelianKonfirmasiPage,
    MitraPage, MitradetailPage,
    DompetPage,
    PesanPage, PesanDetailPage,
    SettingPage,
    KeranjangPage, KeranjangcreatePage,
    SearchPage,
    LoginPage, DaftarPage, ForgotPage, InformasipendaftaranPage,
    TokoPage,
    TokokategoriPage,TokokategoriDetailPage,
    TokokeranjangPage,TokokeranjangPage2,TokokeranjangCreatePage,TokokeranjangCreatePage2,
    TokopemesananPage, TokopemesananDetailPage,TokopemesananCreatePage,
    TokopenjualanPage, TokopenjualanDetailPage,
    TokoprodukPage, TokoprodukCreatePage,
    TokoprofilePage,TokoCreatePage,
    TokosearchPage,
    ProfilePage,
    FilterPage,
    //SortPage,
    //DaftarkurirPage,
    //InformasitokoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileTransfer,
    FileTransferObject,
    FileChooser,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    KategoriserviceProvider,
    KeranjangserviceProvider,
    PembelianserviceProvider,
    SearchserviceProvider,
    LoginserviceProvider,
    TokoprodukserviceProvider,
    TokokategoriserviceProvider,
    TokopenjualanserviceProvider,
    TokopemesananserviceProvider,
    TokokeranjangserviceProvider,
    TokosearchserviceProvider,
    OneSignal,
    HomeserviceProvider,
    ProfileserviceProvider,
    TokoprofileserviceProvider,
    //WebView
  ]
})
export class AppModule {}
