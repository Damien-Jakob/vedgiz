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
                    this.afterValidToken();
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
            console.log("No token found.");
        }

        this.applicationForm = this.formBuilder.group({
            firstname: ['', HomePage.nameValidator],
            lastname: ['', HomePage.nameValidator],
            phonenumber: ['', [
                Validators.required,
                // Can start by +
                // Can use . - / ' ' after a number
                // Min 9 numbers
                // Note : for some reason, \s does not work for matching whitspaces
                Validators.pattern("^[+]?([0-9][-\/\. ]?){9,}$"),
            ]],
        });

        this.connectionForm = this.formBuilder.group({
            token: ['', [
                Validators.required,
                // 60 chars, letters and numbers only
                // Note that some inacurate requirements want only downcase letters
                Validators.pattern("^[a-zA-Z0-9]{60}$")
            ]],
        })
    }

    private submitApplicationForm(): void {
        console.log('Click on the app form');
        console.log('Data sent : ', this.applicationForm.value);

        this.api.apply(this.applicationForm.value).subscribe(
            answer => {
                this.alert(
                    "Inscription réussie",
                    `Vous devriez prochainement recevoir un token d'activation qui vous permettra d'accéder à l'application.`
                );
                this.applicationForm.reset();
            },
            error => {
                console.log('Error : ', error.error);
                console.log(error);
                // Note that error.error is a string or an object depending on the error
                this.alert("Erreur", `Erreur ${error.status} ${error.statusText} (Détail : ${error.error})`);
            });
    }

    private validateToken(): void {
        console.log('Trying to validate the token');

        this.api.validateToken(this.connectionForm.value.token).subscribe(
            answer => {
                console.log('Token validated');

                // TODO save token

                this.afterValidToken();
            },
            error => {
                console.log('Error : ', error.error);
                console.log(error);
                // Note that error.error is a string or an object depending on the error
                this.alert("Erreur", `Erreur ${error.status} ${error.statusText} (Détail : ${error.error})`);
            });
    }

    // static ?
    private afterValidToken(): void {
        console.log("Token is valid.");

        this.router.navigate(['/users/me']);
    }

    private async alert(title: string, message: string) {
        const alert = await this.alertController.create({
            header: title,
            //subHeader: 'Subtitle',
            message: message,
            buttons: ['OK'],
        });

        await alert.present();
    }
}
