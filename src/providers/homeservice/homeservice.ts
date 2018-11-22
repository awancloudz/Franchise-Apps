import { Injectable } from '@angular/core';

//Tambahakan aksiusul
import { HomeArray } from '../../pages/home/homearray';
import { HomeArray2 } from '../../pages/home/homearray2';
import { HomeProdukArray } from '../../pages/home/homeprodukarray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';
/*
  Generated class for the HomeserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HomeserviceProvider {
  //Deklarasi variabel
  private items:HomeArray[]=[];
  private items2:HomeArray2[]=[];
  private item3s:HomeProdukArray[]=[];
  //Memanggil URL Api
  private url:string="http://localhost:8000/api/perangkat";
  private url2:string="http://localhost:8000/api/perangkattoko";
  private url3:string="http://localhost:8000/api/produktokohome";
  constructor(public _http: Http) {
  }
  //Cek + Tambah perangkat
  tambahperangkat(item:HomeArray){
    let body = JSON.stringify(item);
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  tambahperangkat2(item:HomeArray2){
    let body = JSON.stringify(item);
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url2,
                  body, options)
                 .map((response:Response)=>response.json());
  }
  tampilkanproduk(user)
  {
   return this._http.get(this.url3+"/"+user)
   .map((response:Response)=>response.json());
  }
}
