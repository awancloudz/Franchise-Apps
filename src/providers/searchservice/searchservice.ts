import { Injectable } from '@angular/core';
//Tambahakan searcarray
import { SearchArray } from '../../pages/search/searcharray';
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';
//Tambahkan Obervable
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

/*
  Generated class for the SearchserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchserviceProvider {
  private items:SearchArray[]=[];
  private url:string="http://localhost:8000/api/produktoko";
  constructor(public _http: Http) {
    
  }
  cariproduk(item:SearchArray)
  {
    return this._http.get(this.url+"/cari/"+item.namaproduk)
    .map((response:Response)=>response.json());
  }

}
