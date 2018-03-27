import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';
import { IngressoComProvider } from '../../providers/ingresso-com/ingresso-com';
import { AlertController } from 'ionic-angular';

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
  public lista_rooms;


  public deslike: number = 0;
  public tap: number = 0;

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams,
    private ingressocomProvider: IngressoComProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

 
  deslikeEvent(e) {
    this.deslike++
  }
  likeEvent(e) {
    this.tap++
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
}


  carregarFilmes(any) {
    this.ingressocomProvider.getSessionCinemark(this.idCartaz.cinema.cityid,this.idCartaz.cinema.id,this.idCartaz.cinema.corpotarion,this.idCartaz.data).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.filmes = objeto_retorno;

        if (this.page == 1) {
          this.lista_filme = objeto_retorno[0].movies;
        } else {
          this.lista_filme = this.lista_filme.concat(objeto_retorno[0].movies);
        }
        console.log("lista_filme",this.lista_filme)

        if (this.page == 1) {
          this.lista_rooms = this.lista_filme[0].rooms;
        } else {
          this.lista_rooms = this.lista_rooms.concat(this.lista_filme[0].rooms);
        }
        console.log("lista_rooms",this.lista_rooms)
      })
    }

    popUp(session,filmes){
      let alert = this.alertCtrl.create({
        subTitle: '<div>' +
        '    <h2 align="center">Horario</h2>' + session.time + '<p>' + '<h2 algin="center">Valor + taxas web:</h2>' + 'R$' + session.price + '<p>' + '<h2>Classificação:</h2>' + '<p>' + filmes.contentRating +
        '</div>',
        buttons: ['OK']
      });
      alert.present();
    }
}