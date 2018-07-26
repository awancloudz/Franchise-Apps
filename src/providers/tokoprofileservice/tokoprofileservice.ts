import { Injectable } from '@angular/core';
//Tambahakan aksilogin
import { TokoProfileArray } from '../../pages/tokoprofile/tokoprofilearray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';

/*
  Generated class for the TokoprofileserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TokoprofileserviceProvider {
  //Deklarasi variabel
  private items:TokoProfileArray[]=[];
  //Memanggil URL Api
  private url:string="http://localhost:8000/api/toko";

  constructor(public _http: Http) {
    
  }
  //Tampilkan profile
  tampilkanprofile(val){
    return this._http.get(this.url+"/"+val)
    .map((response:Response)=>response.json());
  }
  //Edit Usulan
  editdataprofile(item:TokoProfileArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  //Pendaftaran Toko
  daftartoko(item:TokoProfileArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
}
