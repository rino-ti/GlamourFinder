import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { PersonPage } from '../person/person';


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
  public cast;
  public castid;
  public filme;
  public filmeid;
  public trailer;
  public trailerid;
  public page = 1;
  public lista_filmes = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public movieProvider: MovieProvider
  ) {
  }

  abrirDetalhesPerson(cast){
    this.navCtrl.push(PersonPage, { personid: cast.id });
  }

  ionViewDidEnter() {
    this.trailerid = this.navParams.get("id");
    this.movieProvider.getMovieTrailer(this.trailerid).subscribe(data => {
      let objeto_retorno = (data as any)._body;
      this.trailer = JSON.parse(objeto_retorno);
    }, error => {
      console.log(error);
    })
    this.filmeid = this.navParams.get("id");
    this.movieProvider.getMovieDetails(this.filmeid).subscribe(data => {
      let objeto_retorno = (data as any)._body;
      this.filme = JSON.parse(objeto_retorno);
    }, error => {
      console.log(error);
    })
    this.castid = this.navParams.get("id");
    this.movieProvider.getMovieCast(this.castid).subscribe(data => {
      let objeto_retorno = (data as any)._body;
      this.cast = JSON.parse(objeto_retorno);
    }, error => {
      console.log(error);
    })
  } 
}
