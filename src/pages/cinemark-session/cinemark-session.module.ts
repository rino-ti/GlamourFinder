import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CinemarkSessionPage } from './cinemark-session';

@NgModule({
  declarations: [
    CinemarkSessionPage,
  ],
  imports: [
    IonicPageModule.forChild(CinemarkSessionPage),
  ],
})
export class CinemarkSessionPageModule {}
