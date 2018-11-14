import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PembelianPage,PembelianDetailPage,PembelianCreatePage,PembelianKonfirmasiPage } from './pembelian';
import { SwipeSegmentDirectiveModule } from '../../directives/swipesegment.module';

@NgModule({
  declarations: [
    PembelianPage,PembelianDetailPage,PembelianCreatePage,PembelianKonfirmasiPage
  ],
  imports: [
    IonicPageModule.forChild(PembelianPage),SwipeSegmentDirectiveModule
  ],
})
export class PembelianPageModule {}
