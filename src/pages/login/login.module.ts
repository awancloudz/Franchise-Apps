import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage, DaftarPage, ForgotPage, InformasipendaftaranPage } from './login';

@NgModule({
  declarations: [
    LoginPage, DaftarPage, ForgotPage, InformasipendaftaranPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
