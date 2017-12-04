import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { StreamingMedia , StreamingVideoOptions } from '@ionic-native/streaming-media';


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
  public trailer;
  public trailerid;  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MovieProvider,
    private streamingMedia: StreamingMedia
  ) {
  }

startVideo(){
  let options: StreamingVideoOptions = {
    successCallback: () => { console.log('video played')},
    errorCallback: (e) => { console.log('error video')},
    orientation: 'portrait'
  };

  this.streamingMedia.playVideo('https://www.youtube.com/watch?v=AyS3uw7HZOM', options);

}

  ionViewDidEnter() {
    this.trailerid = this.navParams.get("id");
    this.movieProvider.getMovieTrailer(this.trailerid).subscribe(data=>{
      let retorno =(data as any)._body;
      this.trailer = JSON.parse(retorno);
      console.log("ID do trailer",this.trailer);
    }, error =>{
      console.log(error);
    })
    this.filmeid = this.navParams.get("id");
    this.movieProvider.getMovieDetails(this.filmeid).subscribe(data=>{
      let retorno =(data as any)._body;
      this.filme = JSON.parse(retorno);
    }, error =>{
      console.log(error);
  })
}
}
