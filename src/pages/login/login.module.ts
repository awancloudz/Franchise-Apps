import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage, DaftarownerPage, DaftarmitraPage, ForgotPage, InformasipendaftaranPage } from './login';

@NgModule({
  declarations: [
    LoginPage, DaftarownerPage, DaftarmitraPage, ForgotPage, InformasipendaftaranPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
