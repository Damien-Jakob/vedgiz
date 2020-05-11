import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    private static applicationUrl: string = 'http://127.0.0.1:8000/api/user/apply';

    private static nameValidator = [
        Validators.compose([
            Validators.required,
            Validators.minLength(2)]),
        Validators.pattern('^[a-zA-Zàâäãèéêëėįîïùûü ,.\'-]*'), // conform to the API
    ];

    private applicationForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
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
                //
            ]],
        });
    }

    private submitApplicationForm() {
        console.log('Click on the app form');
        console.log('Data sent : ', this.applicationForm.value);

        this.httpClient.post(HomePage.applicationUrl, this.applicationForm.value).subscribe(
            data => {
                console.log('Data received : ', data);
            },
            error => {
                console.log('Error : ', error.error);
                console.log(error);
            },
            () => {
                console.log('Application request finished');
            });


        /*
        this.http.post(HomePage.applicationUrl, {}, {})
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
         */
    }
}
