import { Injectable } from '@angular/core';
//Tambahakan aksiusul
import { ProdukArray } from '../../pages/produk/produkarray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';
/*
  Generated class for the ProdukserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProdukserviceProvider {
  //Deklarasi variabel
  private items:ProdukArray[]=[];
  private url:string="http://localhost:8000/api/produktoko";

  constructor(public _http: Http) {
  }
  tampilkanproduk()
  {
   return this._http.get(this.url)
   .map((response:Response)=>response.json());
  }
  hapusproduk(item:ProdukArray){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+"/"+item.id,
                    options)
                  .map((response:Response)=>response.json());   
  }
  tambahproduk(item:ProdukArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  editproduk(item:ProdukArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
}
