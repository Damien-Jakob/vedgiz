import {Component, OnInit} from '@angular/core';
import {AuthenticationProvider} from "../authentication-provider.service";
import {Router} from "@angular/router";
import {isNull} from "util";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    constructor(
        private authentication: AuthenticationProvider,
        private router: Router,
    ) {
    }

    ngOnInit() {
    }

    // We want to have to redirect again if the user to this page
    ionViewWillEnter() {
        console.log('Checking the token.');
        this.authentication.loadToken().then(
            answer => {
                if (!isNull(answer)) {
                    console.log('There is a token.');
                    console.log('Checking the validity of the token');
                    this.authentication.me().subscribe(
                        answer => {
                            console.log('Token accepted.');
                            console.log(answer);
                            this.router.navigate(['/users/me']);
                        },
                        error => {
                            console.log('Token invalid');
                            console.log(error);
                            this.router.navigate(['/error', "invalid-token"]);
                        }
                    );
                } else {
                    console.log('There is no token.');
                    this.router.navigate(['/subscribe']);
                }
            }
        );
    }
}