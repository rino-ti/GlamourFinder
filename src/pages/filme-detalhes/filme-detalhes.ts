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
  providers: [
    IngressoComProvider
  ]
})
export class FilmeDetalhesPage {

  public page = 1;
  public page_old = 0;
  public loader;
  public loadingCtrl;
  public filme;
  public filmeid;
  public lista_filme = new Array<any>();
  public idFilmes = this.navParams.get("idFilmes");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ingressocomProvider: IngressoComProvider
  ) {
  }
    
  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes...",
    });
    this.loader.present();
  }

ionViewDidEnter() {
  this.carregaFilmesDetails("idFilmes");
}

abrirDetalhes(filmes){
  this.page_old = this.page;
  this.navCtrl.push(FilmeDetalhesPage, {idFilmes:filmes});
  console.log("id do filme no cartaz para detalhes", filmes)
}


  carregaFilmesDetails(any) {
    this.filmeid = this.navParams.get("idFilmes");
    this.ingressocomProvider.getSessionDetail(this.idFilmes).subscribe(data => {
      let objeto_retorno = (data as any)._body;
      this.filme = JSON.parse(objeto_retorno)


      if (this.page == 1) {
        this.lista_filme = objeto_retorno;
      } else {
        this.lista_filme = this.lista_filme.concat(objeto_retorno);
      }

    }, error => {
      console.log(error);

    })
  } 
}
