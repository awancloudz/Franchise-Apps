import { Injectable } from '@angular/core';
//Tambahakan aksilogin
import { LoginArray } from '../../pages/login/loginarray';
import { DaftarArray } from '../../pages/login/daftararray';
import { HomeArray } from '../../pages/home/homearray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';

/*
  Generated class for the LoginserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginserviceProvider {
  //Deklarasi variabel
  private items:LoginArray[]=[];
  //Memanggil URL Api
  private url:string="http://localhost:8000/api/loginuser";
  private url2:string="http://localhost:8000/api/daftaruser";
  private url3:string="http://localhost:8000/api/resetpassword";
  private url4:string="http://localhost:8000/api/toko";
  constructor(public _http: Http) {
  }

//Cek Daftar
loginuser(item:LoginArray){
  return this._http.get(this.url+"/"+item.noktp+"/password/"+item.password)
  .map((response:Response)=>response.json());
}
cekdaftar(item:LoginArray){
  return this._http.get(this.url2+"/"+item.noktp)
  .map((response:Response)=>response.json());
}
cektoko(item:HomeArray){
  return this._http.get(this.url4+"/"+item.id_warga)
  .map((response:Response)=>response.json());
}
daftaruser(item:DaftarArray){
  let body = JSON.stringify(item);
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this._http.post(this.url2,
                body, options)
               .map((response:Response)=>response.json());
}
resetpassword(item:DaftarArray){
  let body = JSON.stringify(item);
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  return this._http.post(this.url2,
                body, options)
               .map((response:Response)=>response.json());
}
}
