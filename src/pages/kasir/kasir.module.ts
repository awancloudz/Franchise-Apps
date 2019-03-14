import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KasirPage } from './kasir';

@NgModule({
  declarations: [
    KasirPage,
  ],
  imports: [
    IonicPageModule.forChild(KasirPage),
  ],
})
export class KasirPageModule {}
