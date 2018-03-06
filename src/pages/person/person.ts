import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {
  public person;
  public personid;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MovieProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage');
  }
  
  ionViewDidEnter() {
  this.personid = this.navParams.get("personid");
  this.movieProvider.getCastPerson(this.personid).subscribe(data => {
    let objeto_retorno = (data as any)._body;
    this.person = JSON.parse(objeto_retorno);
    console.log("log do personId",this.person)
  }, error => {
    console.log(error);
  })
}
}
