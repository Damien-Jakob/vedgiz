import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    private applyForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.applyForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: [''],
        });
    }

    logForm() {
        console.log(this.applyForm.value)
    }

}
