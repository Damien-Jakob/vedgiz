import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentProviderService} from '../../payment-provider.service';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-payment-create',
    templateUrl: './payment-create.page.html',
    styleUrls: ['./payment-create.page.scss'],
})
export class PaymentCreatePage implements OnInit {
    // TODO validate envelope (use invalid amount)

    // TODO better validation of envelope key
    private static envelopeKeyValidator = [
        Validators.required,
        Validators.minLength(2)
    ];
    // TODO better validation of amount
    private static amountValidator = [
        Validators.required,
        Validators.min(1),
        Validators.pattern('^[1-9][0-9]*$'),
    ];

    private paymentForm: FormGroup;

    constructor(
        private  payment: PaymentProviderService,
        private formBuilder: FormBuilder,
        private alertController: AlertController,
    ) {
        this.paymentForm = this.formBuilder.group({
            key: ['', PaymentCreatePage.envelopeKeyValidator],
            amount: ['50', PaymentCreatePage.amountValidator],
        });
    }

    ngOnInit() {
    }

    // TODO logic
    private submitPaymentForm() {
        this.payment.submitPayment(this.paymentForm.value).subscribe(
            success => {
                console.log('Payment accepted');
            },
            error => {
                console.log(error);
                if (error.status === 404) {
                    this.alert('Erreur', `Numéro d'enveloppe inconnu`);
                } else if (error.status === 400) {
                    this.alert('Erreur', `Montant invalide`);
                } else if (error.status === 403) {
                    this.alert('Erreur', `Envelope déjà utilisée`);
                }
            });
    }

    private async alert(title: string, message: string) {
        const alert = await this.alertController.create({
            header: title,
            // subHeader: 'Subtitle',
            message,
            buttons: ['OK'],
        });

        await alert.present();
    }
}
