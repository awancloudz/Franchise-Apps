import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MitraPage, MitradetailPage } from './mitra';
import { SwipeSegmentDirectiveModule } from '../../directives/swipesegment.module';

@NgModule({
  declarations: [
    MitraPage, MitradetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MitraPage),SwipeSegmentDirectiveModule
  ],
})
export class MitraPageModule {}
