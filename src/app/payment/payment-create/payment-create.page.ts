import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentProviderService} from '../../payment-provider.service';
import {AlertController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';

// TODO find way to test qr-scan

// TODO follow tuto : https://drissas.com/ionic-qr-code/

@Component({
    selector: 'app-payment-create',
    templateUrl: './payment-create.page.html',
    styleUrls: ['./payment-create.page.scss'],
})
export class PaymentCreatePage implements OnInit {
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

    private envelopeVerified = false;

    private paymentForm: FormGroup;

    private showCamera = false;
    private scan = '';

    constructor(
        private payment: PaymentProviderService,
        private qrScanner: QRScanner,
        private formBuilder: FormBuilder,
        private alertController: AlertController,
        private toast: ToastController,
        private router: Router,
    ) {
        this.paymentForm = this.formBuilder.group({
            key: ['', PaymentCreatePage.envelopeKeyValidator],
            amount: ['50', PaymentCreatePage.amountValidator],
        });
    }

    ngOnInit() {
    }

    private async validateEnvelope() {
        this.payment.validateKey(this.paymentForm.controls.key.value).subscribe(
            answer => {
                if (answer.isValid) {
                    this.envelopeVerified = true;
                } else {
                    this.toast.create({
                        message: 'Code invalide',
                        duration: 2000,
                        position: 'bottom',
                    }).then(toast => {
                        toast.present();
                    });
                }
            },
            error => {
                this.toast.create({
                    message: 'Erreur lors de la validation du code',
                    duration: 2000,
                    position: 'bottom',
                }).then(toast => {
                    toast.present();
                });
            }
        );
    }

    private resetEnvelopValidation() {
        this.envelopeVerified = false;
    }

    private async submitPaymentForm() {
        const alert = await this.alertController.create({
            header: 'Confirmation',
            message: `Confirmez-vous que vous voulez payer ${this.paymentForm.value.amount} CHF ?`,
            buttons: [{
                text: 'Annuler',
                handler: () => {
                    this.paymentForm.controls.amount.reset();
                }
            },
                {
                    text: 'Confirmer',
                    handler: () => {
                        this.payment.submit(this.paymentForm.value).subscribe(
                            success => {
                                console.log('Payment accepted');
                                this.toast.create({
                                    message: 'Paiement accepté',
                                    duration: 2000,
                                    position: 'bottom',
                                }).then(toast => {
                                    toast.present();
                                });
                                this.router.navigate(['/users/me']);
                                this.paymentForm.reset();
                                this.resetEnvelopValidation();
                            },
                            error => {
                                console.log(error);
                                if (error.status === 404) {
                                    this.alert('Erreur', `Numéro d'enveloppe inconnu`);
                                    this.resetEnvelopValidation();
                                } else if (error.status === 400) {
                                    this.alert('Erreur', `Montant invalide`);
                                } else if (error.status === 403) {
                                    this.alert('Erreur', `Envelope déjà utilisée`);
                                    this.resetEnvelopValidation();
                                }
                            });
                    }
                }],
        });

        await alert.present();
    }

    private scancode() {
        this.showCamera = true;

        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    // camera permission was granted
                    // start scanning
                    const scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        // put the text into the qr-code
                        this.paymentForm.controls.key.setValue(text);
                        this.resetEnvelopValidation();

                        console.log('Scanned something', text);
                        this.qrScanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning
                        this.showCamera = false;

                        this.validateEnvelope();
                    });

                } else if (status.denied) {
                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((error: any) => console.log('Error : ', error));
    }

    private closeCamera() {
        this.showCamera = false;
        this.qrScanner.hide(); // hide camera preview
        this.qrScanner.destroy();
    }

    private async alert(title: string, message: string) {
        const alert = await this.alertController.create({
            header: title,
            message,
            buttons: ['OK'],
        });

        await alert.present();
    }
}
