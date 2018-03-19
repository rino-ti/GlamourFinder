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
  responseCine(): any {
    throw new Error("Method not implemented.");
  }

  public lista_filmes = new Array<any>();
  public page = 1;
  public page_old = 0;

  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;
  public cinemark;
  public responseCartaz;
  public lista_cartaz;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private ingressocomProvider: IngressoComProvider,
    public loadingCtrl: LoadingController
  ) {
  }



  fechaCarregando(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.cartaz("responseCartaz");
  }

  ionViewDidEnter() {
    this.cartaz("responseCartaz");
  }

  abrirDetalhes(filme) {
    this.page_old = this.page;
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }


  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.cartaz("responseCartaz");
  }

  cartaz(cityid: any,cine:any) {
    if (this.page != this.page_old) {
    this.responseCartaz = this.navParams.get('cityid,cine');
    this.ingressocomProvider.getSessionCinemark(cityid, cine).subscribe(data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);

      if (this.page == 1) {
        this.lista_cartaz = objeto_retorno;
      } else {
        this.lista_cartaz = this.lista_cartaz.concat(objeto_retorno);
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