import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PembelianPage,PembelianDetailPage,PembelianCreatePage } from './pembelian';
import { SwipeSegmentDirective } from '../../directives/swipe-segment.directive';

@NgModule({
  declarations: [
    PembelianPage,PembelianDetailPage,PembelianCreatePage,SwipeSegmentDirective
  ],
  imports: [
    IonicPageModule.forChild(PembelianPage),
  ],
})
export class PembelianPageModule {}
