import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-payment-create',
    templateUrl: './payment-create.page.html',
    styleUrls: ['./payment-create.page.scss'],
})
export class PaymentCreatePage implements OnInit {
    // TODO init
    private static envelopeKeyValidator;
    private static amountValidator;

    private paymentForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
    ) {
        this.paymentForm = this.formBuilder.group({
            envelopeKey: ['', PaymentCreatePage.envelopeKeyValidator],
            amount: ['50.00', PaymentCreatePage.amountValidator],
        });
    }

    ngOnInit() {
    }

    // TODO logic
    private submitPaymentForm() {

    }

}
