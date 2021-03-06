import {Component, OnInit} from '@angular/core';
import {DataProvider} from '../../data-provider.service';
import {Vegetable} from '../../models/vegetable';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
    private quantityForm: FormGroup;

    protected vegetablesToUpdate = new Array<Vegetable>();
    protected validatedVegetables;
    protected displayedVegetableIndex: number;

    constructor(
        protected data: DataProvider,
        protected router: Router,
        private formBuilder: FormBuilder,
        private toast: ToastController,
    ) {
        this.quantityForm = this.formBuilder.group({
            quantity: ['',
                Validators.compose([
                    Validators.required,
                ])]
        });
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.reset();
    }

    protected submitQuantity(): void {
        if (this.quantityForm.controls.quantity.valid) {
            this.validatedVegetables[this.validatedVegetables.length] = ({
                vegetable: this.vegetablesToUpdate[this.displayedVegetableIndex],
                quantity: this.quantityForm.controls.quantity.value
            });
            const vegetables = this.vegetablesToUpdate;
            this.vegetablesToUpdate = new Array<Vegetable>();
            for (let i = 0; i < vegetables.length; i++) {
                if (i < this.displayedVegetableIndex) {
                    this.vegetablesToUpdate[i] = (vegetables[i]);
                } else if (i > this.displayedVegetableIndex) {
                    this.vegetablesToUpdate[i - 1] = (vegetables[i]);
                }
            }
            if (this.displayedVegetableIndex >= this.vegetablesToUpdate.length) {
                this.displayedVegetableIndex = 0;
            }
            if (this.vegetablesToUpdate.length > 0) {
                this.quantityForm.controls.quantity.setValue(this.vegetablesToUpdate[this.displayedVegetableIndex].stock);
            }
        }
        console.log(this.validatedVegetables);
    }

    protected incrementDisplayedVegetableIndex(): void {
        this.displayedVegetableIndex++;
        if (this.displayedVegetableIndex >= this.vegetablesToUpdate.length) {
            this.displayedVegetableIndex = 0;
        }
        this.quantityForm.controls.quantity.setValue(this.vegetablesToUpdate[this.displayedVegetableIndex].stock);
    }

    protected decrementDisplayedVegetableIndex(): void {
        this.displayedVegetableIndex--;
        if (this.displayedVegetableIndex < 0) {
            this.displayedVegetableIndex = this.vegetablesToUpdate.length - 1;
        }
        this.quantityForm.controls.quantity.setValue(this.vegetablesToUpdate[this.displayedVegetableIndex].stock);
    }

    protected reset() {
        this.data.loadVegetables().then(
            answer => {
                console.log('Vegetables loaded');
                console.log(answer);
                this.vegetablesToUpdate = new Array<Vegetable>();
                for (let i = 0; i < answer.length; i++) {
                    this.vegetablesToUpdate[i] = answer[i];
                }
                this.displayedVegetableIndex = 0;
                this.quantityForm.controls.quantity.setValue(this.vegetablesToUpdate[this.displayedVegetableIndex].stock);
                this.validatedVegetables = [];
                console.log(this.vegetablesToUpdate);
                console.log(this.vegetablesToUpdate[this.displayedVegetableIndex]);
            },
        );
    }

    protected submit() {
        const submitData = new Array();
        for (let i = 0; i < this.validatedVegetables.length; i++) {
            submitData[i] = {
                id: this.validatedVegetables[i].vegetable.id,
                quantity: this.validatedVegetables[i].quantity,
            };
        }
        console.log(submitData);
        this.data.postStock({
            quantities: submitData
        }).subscribe(
            answer => {
                this.toast.create({
                    message: 'Les quantités ont été enregistrées',
                    duration: 2000,
                    position: 'bottom',
                }).then(toast => {
                    toast.present();
                });
                this.router.navigate(['/users/me']);
            },
            error => {
                this.toast.create({
                    message: 'Une erreur s\'est produite',
                    duration: 2000,
                    position: 'bottom',
                }).then(toast => {
                    toast.present();
                });
                this.router.navigate(['/users/me']);
            }
        );
    }

    protected testValidation() {
        console.log(this.quantityForm.controls.quantity.value);
        if (this.quantityForm.controls.quantity.valid) {
            console.log('valid');
        } else {
            console.log('invalid');
        }
    }
}
