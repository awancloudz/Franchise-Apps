import { Injectable } from '@angular/core';
//Tambahakan aksilogin
import { MitraArray } from '../../pages/mitra/mitraarray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';
/*
  Generated class for the MitraserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MitraserviceProvider {
  //Deklarasi variabel
  private items:MitraArray[]=[];
  //Memanggil URL Api
  private url:string="http://localhost:8000/api/user";
  constructor(public _http: Http) {
  }

  tampilkanuser()
  {
   return this._http.get(this.url)
   .map((response:Response)=>response.json());
  }
  tampilkandetail(item:MitraArray)
  {
   return this._http.get(this.url+"/detail/"+item.id)
   .map((response:Response)=>response.json());
  }
  edituser(item:MitraArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
}
