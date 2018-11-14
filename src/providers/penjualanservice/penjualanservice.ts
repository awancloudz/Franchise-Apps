import { Injectable } from '@angular/core';
//Tambahakan aksipembelian
import { PenjualanArray } from '../../pages/penjualan/penjualanarray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

/*
  Generated class for the PembelianserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PenjualanserviceProvider {
  private items:PenjualanArray[]=[];
  private url:string="http://localhost:8000/api/penjualantoko";
  private url2:string="http://localhost:8000/api/penjualan";
  constructor(public _http: Http) {
  }
  //Tampilkan
  tampilkanpembelian()
  {
   return this._http.get(this.url)
   .map((response:Response)=>response.json());
  }
  tampilkanverifikasi(item:PenjualanArray)
  {
   return this._http.get(this.url+"/verifikasi/"+item.kodepenjualan)
   .map((response:Response)=>response.json());
  }
  tampilkandetail(item:PenjualanArray)
  {
   return this._http.get(this.url2+"/detail/"+item.id)
   .map((response:Response)=>response.json());
  }
  //Tambah pembelian baru
  tambahpembelian(item:PenjualanArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Edit pembelian
  editpembelian(item:PenjualanArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Verifikasi pembelian
  verifikasipembelian(item:PenjualanArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+"/verifikasi",
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Hapus pembelian
  hapuspembelian(item:PenjualanArray){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+"/"+item.id,
                    options)
                  .map((response:Response)=>response.json());   
  }
}
