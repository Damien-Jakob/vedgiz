import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

// Manually added
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DataProvider} from './data-provider.service';
import {IonicStorageModule} from '@ionic/storage';
import {ApiTokenInterceptor} from './interceptors/ApiTokenInterceptor';
import {CartProvider} from './cart-provider.service';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        // Manually added
        HttpClientModule,
        IonicStorageModule.forRoot(),
    ],
    // Use a single provider for all the app
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        // Manually added
        DataProvider,
        CartProvider,
        {provide: HTTP_INTERCEPTORS, useClass: ApiTokenInterceptor, multi: true},
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
