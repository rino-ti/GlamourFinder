import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { CartazPage } from '../cartaz/cartaz';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ){
  }

  abrirPopulares(){
    this.navCtrl.push(LoginPage);
  }

  abrirSearch(){
    this.navCtrl.push(SearchPage);
  }

  abrirCartaz(){
    this.navCtrl.push(CartazPage);
  }

  ionViewDidLoad() {
  }

}
