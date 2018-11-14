import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SwipeSegmentDirective } from '../directives/swipe-segment.directive';

@NgModule({
  declarations: [
    SwipeSegmentDirective
  ],
  exports: [
    SwipeSegmentDirective
  ],
})
export class SwipeSegmentDirectiveModule {}
