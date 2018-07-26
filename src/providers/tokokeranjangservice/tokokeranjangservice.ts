import { Injectable } from '@angular/core';
//Tambahakan aksikeranjang
import { TokokeranjangArray } from '../../pages/tokokeranjang/tokokeranjangarray';
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
export class TokokeranjangserviceProvider {
  private items:TokokeranjangArray[]=[];
  private url:string="http://localhost:8000/api/keranjangtoko";
  constructor(public _http: Http) {
  }

  //Tampilkan
  tampilkankeranjang()
  {
   return this._http.get(this.url)
   .map((response:Response)=>response.json());
  }
  //Tambah keranjang baru
  tambahkeranjang(item:TokokeranjangArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Edit Usulan
  editkeranjang(item:TokokeranjangArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+"/"+item.id,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Hapus keranjang
  hapuskeranjang(item:TokokeranjangArray){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+"/"+item.id,
                    options)
                  .map((response:Response)=>response.json());   
  }
}
