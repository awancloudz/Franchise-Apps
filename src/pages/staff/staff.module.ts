import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffPage, StaffdetailPage } from './staff';

@NgModule({
  declarations: [
    StaffPage, StaffdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffPage),
  ],
})
export class StaffPageModule {}
