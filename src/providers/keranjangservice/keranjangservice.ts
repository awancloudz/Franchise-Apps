import { Injectable } from '@angular/core';
//Tambahakan aksikeranjang
import { KeranjangArray } from '../../pages/keranjang/keranjangarray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
/*
  Generated class for the KeranjangserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KeranjangserviceProvider {
  private items:KeranjangArray[]=[];
  //private url:string="http://localhost:8000/api/kategoriproduk";
  private url:string="http://localhost:8000/api/keranjang";
  constructor(public _http: Http) {
  }

  //Tampilkan
  tampilkankeranjang(user)
  {
   return this._http.get(this.url+"/"+user)
   .map((response:Response)=>response.json());
  }
  //Tambah keranjang baru
  tambahkeranjang(item:KeranjangArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Edit Usulan
  editkeranjang(item:KeranjangArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+"/"+item.id,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Hapus keranjang
  hapuskeranjang(item:KeranjangArray){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+"/"+item.id,
                    options)
                  .map((response:Response)=>response.json());   
  }
}
