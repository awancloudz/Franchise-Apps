import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffPage, StaffdetailPage, StaffcreatePage, StaffeditPage} from './staff';

@NgModule({
  declarations: [
    StaffPage, StaffdetailPage, StaffcreatePage, StaffeditPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffPage),
  ],
})
export class StaffPageModule {}
