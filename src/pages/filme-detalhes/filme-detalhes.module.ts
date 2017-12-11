import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilmeDetalhesPage } from './filme-detalhes';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    FilmeDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(FilmeDetalhesPage),
    PipesModule
  ],
})
export class FilmeDetalhesPageModule {}
