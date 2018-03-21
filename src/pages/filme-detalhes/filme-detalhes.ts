import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IngressoComProvider } from '../../providers/ingresso-com/ingresso-com';


/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
})
export class FilmeDetalhesPage {

  public filme;
  public filmeid;
  public page = 1;
  public lista_filmes = new Array<any>();
  public id = this.navParams.get("id");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ingressocomProvider: IngressoComProvider
  ) {
  }

  ionViewDidEnter(any) {
    this.filmeid = this.navParams.get("id");
    console.log("log antes da function",this.id)
    this.ingressocomProvider.getSessionDetail(this.id).subscribe(data => {
      let objeto_retorno = (data as any)._body;
      this.filme = JSON.parse(objeto_retorno);
      console.log("log delhaes page",this.filme)
    }, error => {
      console.log(error);
    })
  } 
}
