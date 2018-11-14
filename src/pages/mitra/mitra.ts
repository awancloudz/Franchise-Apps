import { Component } from '@angular/core';
import { IonicPage, Events,NavController, NavParams, Platform, ActionSheetController, LoadingController ,ToastController,AlertController,normalizeURL } from 'ionic-angular';
//Tambahkan Provider
import { MitraserviceProvider } from '../../providers/mitraservice/mitraservice';
import { MitraArray } from './mitraarray';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MitraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mitra',
  templateUrl: 'mitra.html',
})
export class MitraPage {
  public category: string = 'calon_mitra';
  public categories: Array<string> = ['calon_mitra','mitra_aktif']

  items:MitraArray[]=[];
  // mitra:string;

  constructor(public navCtrl: NavController,public navParams: NavParams,
    public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public loadincontroller:LoadingController,public mitraservice:MitraserviceProvider,public _toast:ToastController,
    public alertCtrl: AlertController,private storage: Storage,private events: Events) {
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
    this.mitraservice.tampilkanuser().subscribe(
      //Jika data sudah berhasil di load
      (data:MitraArray[])=>{
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

  onTabChanged(tabName) {
    this.category = tabName;
  }

  mitradetail(item) {
    this.nav.push (MitradetailPage, {item: item});
  }
}

@Component({
  selector: 'page-mitra',
  templateUrl: 'mitra-detail.html',
  entryComponents:[ MitraPage ],
})
export class MitradetailPage {
  item;
  items:MitraArray[]=[];
  id:Number;
  alamat:String;
  nama:String;
  email:String;
  password:String;
  level:String;
  status:Number;
  nohp:String;
  fotoktp:String;
  fotowajah:String;

  constructor(public navCtrl: NavController,public params: NavParams,
    public nav: NavController,public platform: Platform,public actionSheetCtrl: ActionSheetController,
    public loadincontroller:LoadingController,public mitraservice:MitraserviceProvider,public _toast:ToastController,
    public alertCtrl: AlertController,private storage: Storage,private events: Events) {
    this.item = params.data.item;
    //Hapus Back
    let backAction =  platform.registerBackButtonAction(() => {
      this.nav.pop();
      backAction();
    },2)
  }

  ionViewDidLoad() {
    //Loading bar
    let loadingdata=this.loadincontroller.create({
      content:"Loading..."
    });
    loadingdata.present();
    //Tampilkan data dari server
    this.mitraservice.tampilkandetail(new MitraArray(this.item.id,this.item.nama,this.item.alamat,this.item.email,this.item.level,this.item.status,this.item.fotoktp,this.item.fotowajah,this.item.nohp)).subscribe(
      //Jika data sudah berhasil di load
      (data:MitraArray[])=>{
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
    if(this.item.status == 1){
      var pesan = "Verifikasi / Aktivasi akun user sukses."; 
    }
    if(this.item.status == 2){
      var pesan = "Suspend akun user sukses."; 
    }
    //Pemberitahuan
    let alert = this.alertCtrl.create({
      title: 'Informasi',
      subTitle: pesan,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.nav.setRoot(MitraPage);
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
    this.mitraservice.edituser(new MitraArray(this.item.id,this.item.nama,this.item.alamat,this.item.email,this.item.level,this.item.status,this.item.fotoktp,this.item.fotowajah,this.item.nohp))
    .subscribe(
      //Jika data sudah berhasil di load
      (data:MitraArray[])=>{
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
}