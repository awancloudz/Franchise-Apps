import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageuploadPage } from './imageupload';

@NgModule({
  declarations: [
    ImageuploadPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageuploadPage),
  ],
})
export class ImageuploadPageModule {}
