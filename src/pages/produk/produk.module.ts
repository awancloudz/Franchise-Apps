import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdukPage, ProdukeditPage, ProdukcreatePage } from './produk';

@NgModule({
  declarations: [
    ProdukPage, ProdukeditPage, ProdukcreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProdukPage),
  ],
})
export class ProdukPageModule {}
