import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public lista_filmes_search = new Array<any>();
  public page = 1;
  public page_old = 0;
  public responseSearch;
  public loader;
  public isRefreshing;
  public refresher;
  public infiniteScroll

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }


  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes...",
    });
    this.loader.present();
  }

  fechaCarregando() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.search();
  }

  ionViewDidEnter() {
    this.search();
  }

  abrirDetalhes(filme) {
    this.page_old = this.page;
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.search();
  }

  search(searchBar: string) {
    if (this.page != this.page_old) {
      this.abreCarregando();
    this.responseSearch = this.navParams.get(searchBar);
    this.movieProvider.getSearchMovie(searchBar).subscribe(data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      if (this.page == 1) {
        this.lista_filmes_search = objeto_retorno.results;
      } else {
        this.lista_filmes_search = this.lista_filmes_search.concat(objeto_retorno.results);
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