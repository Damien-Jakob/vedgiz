import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    private applicationForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
      // TODO : more advanced validation with Vilidators.pattern() -> regex
        this.applicationForm = this.formBuilder.group({
            firstname: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            lastname: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            phonenumber: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        });
    }

    private submitApplicationForm() {
        console.log(this.applicationForm.value)
    }
}
