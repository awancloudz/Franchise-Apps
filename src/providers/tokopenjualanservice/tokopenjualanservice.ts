import { Injectable } from '@angular/core';
//Tambahakan aksipembelian
import { TokopenjualanArray } from '../../pages/tokopenjualan/tokopenjualanarray';
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
export class TokopenjualanserviceProvider {
  private items:TokopenjualanArray[]=[];
  private url:string="http://localhost:8000/api/penjualantoko";
  constructor(public _http: Http) {
  }
  //Tampilkan penjualan
  tampilkanpenjualan(toko)
  {
   return this._http.get(this.url+"/"+toko)
   .map((response:Response)=>response.json());
  }
  tampilkandetail(item:TokopenjualanArray)
  {
   return this._http.get(this.url+"/detail/"+item.id)
   .map((response:Response)=>response.json());
  }
  //Tambah penjualan baru
  tambahpenjualan(item:TokopenjualanArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Edit penjualan
  editpenjualan(item:TokopenjualanArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Hapus penjualan
  hapuspenjualan(item:TokopenjualanArray){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+"/"+item.id,
                    options)
                  .map((response:Response)=>response.json());   
  }
}
