import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

/*
  Generated class for the IngressoComProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IngressoComProvider {

  private baseApiIngresso = "/v0"
  private baseApiIngressoCity = "/sessions/city/"
  private baseApiIngressoTheater = "/theater/"
  private baseApiIngressoPartnership = "/partnership/"

  constructor(public http: Http,
    private _plataform: Platform
  
  ) {
    if(this._plataform.is("cordova")){
      this.baseApiIngresso = "https://api-content.ingresso.com"
    }
  }

  getSessionCinemark(cityid,theaterId,partnership){
    return this.http.get(this.baseApiIngresso + this.baseApiIngressoCity +`${cityid}` + this.baseApiIngressoTheater + `${theaterId}` + this.baseApiIngressoPartnership + `${partnership}`);
  }

  getSessionCinemark2(){
    return this.http.get(this.baseApiIngresso + this.baseApiIngressoCity +`1` + this.baseApiIngressoTheater + `120` + this.baseApiIngressoPartnership + `cinemark`);
  }

}