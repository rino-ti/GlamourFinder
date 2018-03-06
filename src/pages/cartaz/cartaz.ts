import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the CartazPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cartaz',
  templateUrl: 'cartaz.html',
  providers: [
    MovieProvider
  ]
})
export class CartazPage {

public lista_filmes = new Array<any>();
  public page = 1;
  public page_old = 0;

  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes...",
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
  }

ionViewDidEnter() {
  this.carregarFilmes();
}

abrirDetalhes(filme){
  this.page_old = this.page;
  this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
}

doInfinite(infiniteScroll) {
  this.page++;
 this.infiniteScroll = infiniteScroll;
 this.carregarFilmes();
}

carregarFilmes(){
  if( this.page!=this.page_old){
  this.abreCarregando();
  this.movieProvider.getMovieCartaz(this.page).subscribe(
    data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      if (this.page == 1){
        this.lista_filmes = objeto_retorno.results;
      }else{
      this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
      }

      this.fechaCarregando();
      if (this.isRefreshing) {
        this.refresher.complete();
        this.isRefreshing = false;
      }
    }, error => {
      this.fechaCarregando();
      if (this.isRefreshing) {
        this.refresher.complete();
        this.isRefreshing = false;
      }
    }
  )
}
}
}