import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartazCinemarkPage } from '../cartaz-cinemark/cartaz-cinemark';
import { IngressoComProvider } from '../../providers/ingresso-com/ingresso-com';

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
    IngressoComProvider
  ]
})
export class CartazPage {


  public page = 1;
  public page_old = 0;
  public state;
  public lista_state;
  public lista_cidade;
  public cidade;
  public responseState;
  public responseCinema;
  public cinema;
  public lista_cinema;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ingressocomProvider: IngressoComProvider
  ) {
  }

  ionViewDidEnter() {
    this.buscaState();
  }

buscaCartaz(cityid: any,cine:any){
  this.page_old = this.page;
  this.navCtrl.push(CartazCinemarkPage)
  console.log ("push cartaz cinemark", cityid ,cine);
}

buscaState(){
  this.ingressocomProvider.getStates().subscribe(
    data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);
      this.state = objeto_retorno;
      console.log("log state ",this.state)

      if(this.page == 1){
        this.lista_state = objeto_retorno;
      }else{
        this.lista_state = this.lista_state.concat(objeto_retorno);
      }
})
}

buscaCidade(response: any){
  this.responseState = this.navParams.get(response);
  this.ingressocomProvider.getCidade(response).subscribe(
    data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);
      this.cidade = objeto_retorno;
      console.log("log cidade ",this.cidade)

      if(this.page == 1){
        this.lista_cidade = objeto_retorno.cities;
      }else{
        this.lista_cidade = this.lista_cidade.concat(objeto_retorno.cities);
      }
})
}

buscaCinema(response: any){
  this.responseCinema = this.navParams.get(response);
  this.ingressocomProvider.getCinema(response).subscribe(
    data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);
      this.cinema = objeto_retorno;
      console.log("log cinema ",this.cinema)

      if(this.page == 1){
        this.lista_cinema = objeto_retorno;
      }else{
        this.lista_cinema = this.lista_cidade.concat(objeto_retorno);
      }
})
}

}