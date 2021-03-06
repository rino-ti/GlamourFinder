import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http";
import { IntroPageModule } from '../pages/intro/intro.module';
import { LoginPageModule } from '../pages/login/login.module';
import { MovieProvider } from '../providers/movie/movie';
import { FilmeDetalhesPageModule } from '../pages/filme-detalhes/filme-detalhes.module';
import { PipesModule } from '../pipes/pipes.module';
import { SearchPageModule } from '../pages/search/search.module';
import { CartazPageModule } from '../pages/cartaz/cartaz.module';
import { PersonPageModule } from '../pages/person/person.module';
import { IngressoComProvider } from '../providers/ingresso-com/ingresso-com';
import { CartazCinemarkPageModule } from '../pages/cartaz-cinemark/cartaz-cinemark.module';




@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    IntroPageModule,
    HttpModule,
    FilmeDetalhesPageModule,
    PipesModule,
    SearchPageModule,
    CartazPageModule,
    PersonPageModule,
    CartazCinemarkPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieProvider,
    IngressoComProvider
  ]
})
export class AppModule {}
