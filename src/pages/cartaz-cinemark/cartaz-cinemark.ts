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
  public lista_filme;
  public responseDatas;
  public idCartaz = this.navParams.get("idCartaz");
  public detalhes;
  public responseDetalhes;

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams,
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

ionViewDidEnter() {
  this.carregarFilmes("idCartaz");
}

abrirDetalhes(filmes){
  this.page_old = this.page;
  this.navCtrl.push(FilmeDetalhesPage, {idFilmes:filmes});
  console.log("id do filme no cartaz para detalhes", filmes)
}


  carregarFilmes(any) {
    this.ingressocomProvider.getSessionCinemark(this.idCartaz.cinema.cityid,this.idCartaz.cinema.id,this.idCartaz.cinema.corpotarion,this.idCartaz.data).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.filmes = objeto_retorno;
        console.log("json do provider da function",objeto_retorno)

        if (this.page == 1) {
          this.lista_filme = objeto_retorno[0].movies;
        } else {
          this.lista_filme = this.lista_filme.concat(objeto_retorno[0].movies);
        }
      })
    }
}