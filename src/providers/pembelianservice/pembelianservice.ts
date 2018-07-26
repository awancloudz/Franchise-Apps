import { Injectable } from '@angular/core';
//Tambahakan aksipembelian
import { PembelianArray } from '../../pages/pembelian/pembelianarray';
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
export class PembelianserviceProvider {
  private items:PembelianArray[]=[];
  private url:string="http://localhost:8000/api/penjualan";
  constructor(public _http: Http) {
  }
  //Tampilkan
  tampilkanpembelian(user)
  {
   return this._http.get(this.url+"/"+user)
   .map((response:Response)=>response.json());
  }
  tampilkandetail(item:PembelianArray)
  {
   return this._http.get(this.url+"/detail/"+item.id)
   .map((response:Response)=>response.json());
  }
  //Tambah pembelian baru
  tambahpembelian(item:PembelianArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Edit pembelian
  editpembelian(item:PembelianArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Hapus pembelian
  hapuspembelian(item:PembelianArray){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+"/"+item.id,
                    options)
                  .map((response:Response)=>response.json());   
  }
}
