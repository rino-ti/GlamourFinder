import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private baseApiPath = "https://api.themoviedb.org/3"
  private baseApiKey = "635c4f3c05b93b29f4a75c68f6e323fa"
  private baseLeaguage = "&language=pt-BR"

  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getLatesMovies(page = 1){
    return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=` + this.baseApiKey + this.baseLeaguage);
  }

  getMovieDetails(filmeid){
    return this.http.get(this.baseApiPath + `/movie/${filmeid}?api_key=` + this.baseApiKey + this.baseLeaguage);
  }

  getMovieTrailer(trailerid){
    return this.http.get(this.baseApiPath + `/movie/${trailerid}/videos?api_key=` + this.baseApiKey + this.baseLeaguage);
  }

}