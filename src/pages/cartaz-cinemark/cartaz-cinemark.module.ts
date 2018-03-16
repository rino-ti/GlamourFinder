import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartazCinemarkPage } from './cartaz-cinemark';

@NgModule({
  declarations: [
    CartazCinemarkPage,
  ],
  imports: [
    IonicPageModule.forChild(CartazCinemarkPage),
  ],
})
export class CartazCinemarkPageModule {}
