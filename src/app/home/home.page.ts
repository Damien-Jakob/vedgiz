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
        this.applicationForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: [''],
        });
    }

    private submitApplicationForm() {
        console.log(this.applicationForm.value)
    }
}
