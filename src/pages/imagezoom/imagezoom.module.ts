import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImagezoomPage } from './imagezoom';

@NgModule({
  declarations: [
    ImagezoomPage,
  ],
  imports: [
    IonicPageModule.forChild(ImagezoomPage),
  ],
})
export class ImagezoomPageModule {}
