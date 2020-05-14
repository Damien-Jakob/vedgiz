import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {ApiCallerService} from "../api-caller.service";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private alertController: AlertController,
        private authentication: AuthenticationService,
        private router: Router,
        private api: ApiCallerService,
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        if (this.authentication.hasToken()) {
            console.log('Trying to validate the token.');

            // Test if the registered token is valid
            this.api.me().subscribe(
                answer => {
                    // success
                    this.router.navigate(['/users/me']);
                },
                error => {
                    // failure
                    console.log('Error : ', error.error);
                    console.log(error);

                    this.router.navigate(['/error', "invalid-token"]);
                },
                () => {
                    // kept here for example
                });
        } else {
            this.router.navigate(['/subscribe']);
        }
    }
}