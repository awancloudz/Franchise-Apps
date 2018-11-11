import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PenjualanPage, PenjualandetailPage } from './penjualan';
import { FilterPage } from '../filter/filter';

@NgModule({
  declarations: [
    PenjualanPage, PenjualandetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PenjualanPage),
  ],
})
export class PenjualanPageModule {}
