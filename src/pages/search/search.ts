import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  public lista_filmes = new Array<any>();
  public page = 1;
  public page_old = 0;
  public responseSearch;
  public loader;
  public loadingCtrl;
  public isRefreshing;
  public refresher

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MovieProvider
  ){
  }

  search(searchBar: string) {
    this.responseSearch = this.navParams.get(searchBar);
    this.movieProvider.getSearchMovie(searchBar).subscribe(data=>{
      let retorno =(data as any)._body;
      this.responseSearch = JSON.parse(retorno);
      console.log("Json do search", this.responseSearch);
    }, error =>{
      console.log(error);
    }) 
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

carregarFilmes(){
  if( this.page!=this.page_old){
  this.abreCarregando();
  this.movieProvider.getSearchMovie(this.page).subscribe(
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}