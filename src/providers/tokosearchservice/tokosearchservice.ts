import { Injectable } from '@angular/core';
//Tambahakan searcarray
import { TokosearchArray } from '../../pages/tokosearch/tokosearcharray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

/*
  Generated class for the TokosearchserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TokosearchserviceProvider {
  private items:TokosearchArray[]=[];
  private url:string="http://localhost:8000/api/produkbumdes";
  constructor(public _http: Http) {
    
  }
  cariproduk(item:TokosearchArray)
  {
    return this._http.get(this.url+"/cari/"+item.namaproduk)
    .map((response:Response)=>response.json());
  }
}
