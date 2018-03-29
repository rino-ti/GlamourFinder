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
  private baseApiIngressoDate = "?date="
  private baseApiIngressoEvent = "/events/"
  private baseApiIngressoKey = "?api_key=getcine"

  constructor(public http: Http,
    private _plataform: Platform
  
  ) {
    if(this._plataform.is("cordova")){
      this.baseApiIngresso = "https://api-content.ingresso.com"
    }
  }

  getSessionCinemark(cityid,id,corpotarion,data){
    return this.http.get(this.baseApiIngresso + this.baseApiIngressoCity +`${cityid}` + this.baseApiIngressoTheater + `${id}` + this.baseApiIngressoPartnership + `${corpotarion}` + this.baseApiIngressoDate + `${data}` + this.baseApiIngressoKey);
  }

  getSessionAll(cityid,id,corpotarion){
    return this.http.get(this.baseApiIngresso + this.baseApiIngressoCity +`${cityid}` + this.baseApiIngressoTheater + `${id}` + this.baseApiIngressoPartnership + `${corpotarion}` + this.baseApiIngressoKey);
  }

  getSessionDetail(idFilmes){
    return this.http.get(this.baseApiIngresso + this.baseApiIngressoEvent + `${idFilmes}` + this.baseApiIngressoKey);
  }

  getStates(){
    return this.http.get(this.baseApiIngresso + `/states` + this.baseApiIngressoKey);
  }

  getCidade(response){
    return this.http.get(this.baseApiIngresso + `/states/` + `${response}` + this.baseApiIngressoKey );
  }

  getCinema(response){
    return this.http.get(this.baseApiIngresso + `/theaters/city/` + `${response}` + this.baseApiIngressoKey );
  }

}