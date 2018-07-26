import { Injectable } from '@angular/core';
//Tambahakan aksiusul
import { TokokategoriArray } from '../../pages/tokokategori/tokokategoriarray';
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
export class TokokategoriserviceProvider {
  private items:TokokategoriArray[]=[];
  private url:string="http://localhost:8000/api/kategoriprodukbumdes";
  constructor(public _http: Http) {
  }

  //Tampilkan
  tampilkankategori()
  {
   return this._http.get(this.url)
   .map((response:Response)=>response.json());
  }

  tampilkandetail(item:TokokategoriArray)
  {
   return this._http.get(this.url+"/"+item.id)
   .map((response:Response)=>response.json());
  }
  
}
