import { Injectable } from '@angular/core';
//Tambahakan aksikeranjang
import { TokoprodukArray } from '../../pages/tokoproduk/tokoprodukarray';
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
export class TokoprodukserviceProvider {
  private items:TokoprodukArray[]=[];
  //private url:string="http://localhost:8000/api/kategoriproduk";
  private url:string="http://localhost:8000/api/produktoko";
  constructor(public _http: Http) {
  }

  //Tampilkan
  tampilkanproduk(toko)
  {
   return this._http.get(this.url+"/"+toko)
   .map((response:Response)=>response.json());
  }
  //Tambah produk baru
  tambahproduk(item:TokoprodukArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Edit produk
  editproduk(item:TokoprodukArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+"/"+item.id,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Hapus produk
  hapusproduk(item:TokoprodukArray){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+"/"+item.id,
                    options)
                  .map((response:Response)=>response.json());   
  }
}
