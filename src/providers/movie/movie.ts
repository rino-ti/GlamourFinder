import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private baseApiPath = "https://api.themoviedb.org/3"

  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getLatesMovies(){
    return this.http.get(this.baseApiPath + "/movie/popular?api_key=635c4f3c05b93b29f4a75c68f6e323fa");
  }

}
