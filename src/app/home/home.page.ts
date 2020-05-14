import {Component} from '@angular/core';
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
export class HomePage {
    private applicationForm: FormGroup;
    private connectionForm: FormGroup;

    private static nameValidator = [
        Validators.compose([
            Validators.required,
            Validators.minLength(2)]),
        Validators.pattern('^[a-zA-Zàâäãèéêëėįîïùûü ,.\'-]*'), // conform to the API
    ];

    constructor(
        private formBuilder: FormBuilder,
        private alertController: AlertController,
        private authentication: AuthenticationService,
        private router: Router,
        private api: ApiCallerService,
    ) {
        // TODO find a better place to do this initial routing ?
        if (this.authentication.hasToken()) {
            console.log('Trying to validate the token.');

            // Test if the registered token is valid
            this.api.me().subscribe(
                answer => {
                    this.router.navigate(['/users/me']);
                },
                error => {
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