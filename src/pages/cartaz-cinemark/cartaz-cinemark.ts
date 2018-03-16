import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';
import { IngressoComProvider } from '../../providers/ingresso-com/ingresso-com';

/**
 * Generated class for the CartazCinemarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cartaz-cinemark',
  templateUrl: 'cartaz-cinemark.html',  
  providers: [
    IngressoComProvider
  ]
})
export class CartazCinemarkPage {

  public lista_filmes = new Array<any>();
  public page = 1;
  public page_old = 0;

  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;
  public cinemark;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private ingressocomProvider: IngressoComProvider,
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
  this.ingressocomProvider.getSessionCinemark2().subscribe(
    data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);
      this.cinemark = objeto_retorno;
      console.log("log session cinemark",this.cinemark)

      if (this.page == 1){
        this.lista_filmes = objeto_retorno;
      }else{
      this.lista_filmes = this.lista_filmes.concat(objeto_retorno);
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