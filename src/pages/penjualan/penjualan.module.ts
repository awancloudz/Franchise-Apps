import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PenjualanPage, PenjualandetailPage } from './penjualan';
import { FilterPage } from '../filter/filter';
import { SwipeSegmentDirectiveModule } from '../../directives/swipesegment.module';

@NgModule({
  declarations: [
    PenjualanPage, PenjualandetailPage
  ],
  imports: [
    IonicPageModule.forChild(PenjualanPage),SwipeSegmentDirectiveModule
  ],
})
export class PenjualanPageModule {}
