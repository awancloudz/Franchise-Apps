import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MitraPage, MitradetailPage } from './mitra';

@NgModule({
  declarations: [
    MitraPage, MitradetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MitraPage),
  ],
})
export class MitraPageModule {}
