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

  public page = 1;
  public page_old = 0;

  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;
  public filmes;
  public lista_filme = new Array<any>();
  public responseDatas;
  public response;

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

    this.carregarFilmes("response");
  }

ionViewDidEnter() {
  this.carregarFilmes("response");
}

abrirDetalhes(filme){
  this.page_old = this.page;
  this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
}

doInfinite(infiniteScroll) {
  this.page++;
 this.infiniteScroll = infiniteScroll;
 this.carregarFilmes("response");
}

  carregarFilmes(response: any) {
    console.log("log do response",response)
    if (this.page != this.page_old) {
    this.responseDatas = this.navParams.get("datas");
    this.ingressocomProvider.getSessionCinemark(response.cityid,response.id,response.corpotarion).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.filmes = objeto_retorno;
        console.log("log dos filmes", this.filmes)

        if (this.page == 1) {
          this.lista_filme = objeto_retorno;
        } else {
          this.lista_filme = this.lista_filme.concat(objeto_retorno);
        }
      })
    }
  }
}