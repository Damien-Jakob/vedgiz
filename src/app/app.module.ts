import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

// Manually added
import {HttpClientModule} from '@angular/common/http';
import {ApiCallerService} from "./api-caller.service";
import {DataProvider} from "./data-provider.service";

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        // Manually added
        HttpClientModule,
    ],
    // Use a single provider for all the app
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        // Manually added
        ApiCallerService,
        DataProvider,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
