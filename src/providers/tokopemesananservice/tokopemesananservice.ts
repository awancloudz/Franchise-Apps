import { Injectable } from '@angular/core';
//Tambahakan aksipembelian
import { TokopemesananArray } from '../../pages/tokopemesanan/tokopemesananarray';
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
export class TokopemesananserviceProvider {
  private items:TokopemesananArray[]=[];
  private url:string="http://localhost:8000/api/pemesanan";
  constructor(public _http: Http) {
  }
  //Tampilkan pemesanan
  tampilkanpemesanan()
  {
   return this._http.get(this.url)
   .map((response:Response)=>response.json());
  }
  tampilkandetail(item:TokopemesananArray)
  {
   return this._http.get(this.url+"/"+item.id)
   .map((response:Response)=>response.json());
  }
  //Tambah pemesanan baru
  tambahpemesanan(item:TokopemesananArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Edit pemesanan
  editpemesanan(item:TokopemesananArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+"/"+item.id,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Hapus pemesanan
  hapuspemesanan(item:TokopemesananArray){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+"/"+item.id,
                    options)
                  .map((response:Response)=>response.json());   
  }
}
