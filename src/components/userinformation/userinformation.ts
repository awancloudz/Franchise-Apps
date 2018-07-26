import { Component } from '@angular/core';

/**
 * Generated class for the UserinformationComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'userinformation',
  templateUrl: 'userinformation.html'
})
export class UserinformationComponent {

  text: string;

  constructor() {
    console.log('Hello UserinformationComponent Component');
    this.text = 'Penilaian yang diberikan oleh penjual saat pengguna memberikan review';
  }

}
