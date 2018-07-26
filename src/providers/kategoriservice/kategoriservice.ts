import { Injectable } from '@angular/core';
//Tambahakan aksiusul
import { KategoriArray } from '../../pages/kategori/kategoriarray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

/*
  Generated class for the KategoriserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KategoriserviceProvider {
  private items:KategoriArray[]=[];
  private url:string="http://localhost:8000/api/kategoriproduk";
  constructor(public _http: Http) {
  }

  //Tampilkan
  tampilkankategori()
  {
   return this._http.get(this.url)
   .map((response:Response)=>response.json());
  }

  tampilkandetail(item:KategoriArray)
  {
   return this._http.get(this.url+"/"+item.id)
   .map((response:Response)=>response.json());
  }
  tampilkandetail2(item:KategoriArray)
  {
   return this._http.get(this.url+"/idkat/"+item.id_kategoriproduk+"/idsub/"+item.id)
   .map((response:Response)=>response.json());
  }
}
