import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    menuContent: any = [
        {
            title: 'Légumes',
            url: '/vegetables',
        },
        {
            title: 'Panier',
            url: '/cart',
        },
        {
            title: 'Paiement',
            url: '/payment/create',
        },
        {
            title: 'Profil',
            url: '/users/me',
        },
        {
            title: 'Stock',
            url: 'stock',
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
