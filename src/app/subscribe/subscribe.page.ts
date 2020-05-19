import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AlertController, ToastController} from '@ionic/angular';
import {AuthenticationProvider} from "../authentication-provider.service";
import {Router} from "@angular/router";
import {ApiCallerService} from "../api-caller.service";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'app-subscribe',
    templateUrl: 'subscribe.page.html',
    styleUrls: ['subscribe.page.scss'],
})
export class SubscribePage {
    private applicationForm: FormGroup;
    private connectionForm: FormGroup;
    private token: string;

    private static nameValidator = [
        Validators.compose([
            Validators.required,
            Validators.minLength(2)]),
        Validators.pattern('^[a-zA-Zàâäãèéêëėįîïùûü ,.\'-]*'), // conform to the API
    ];

    constructor(
        private formBuilder: FormBuilder,
        private alertController: AlertController,
        private toast: ToastController,
        private authentication: AuthenticationProvider,
        private storage: Storage,
        private router: Router,
    ) {
        this.applicationForm = this.formBuilder.group({
            firstname: ['', SubscribePage.nameValidator],
            lastname: ['', SubscribePage.nameValidator],
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

        this.authentication.apply(this.applicationForm.value).subscribe(
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

        this.authentication.storeToken(this.connectionForm.value.token).then(
            answer => {
                this.authentication.me().subscribe(
                    answer => {
                        console.log('Token validated');

                        this.authentication.storeToken(this.token);

                        this.toast.create({
                            message: "Token enregistré.",
                            duration: 2000,
                            position: "bottom",
                        }).then(toast => {
                            toast.present();
                        });

                        this.router.navigate(['/users/me']);
                    },

                    error => {
                        
                        console.log('Error : ', error.error);
                        console.log(error);

                        this.authentication.deleteToken();

                        // Note that error.error is a string or an object depending on the error
                        this.alert("Erreur", `Erreur ${error.status} ${error.statusText} (Détail : ${error.error})`);
                    }
                )
            }
        );
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
