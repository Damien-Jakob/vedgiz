import {Component, OnInit} from '@angular/core';
import {DataProvider} from '../../data-provider.service';
import {Vegetable} from '../../models/vegetable';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
    // TODO find why validator is not applied
    private static quantityValidator = [
        Validators.required,
        Validators.min(0.01),
    ];

    private quantityForm: FormGroup;

    protected vegetablesToUpdate = new Array<Vegetable>();
    protected displayedVegetableIndex: number;

    constructor(
        protected data: DataProvider,
        private formBuilder: FormBuilder,
    ) {
        this.quantityForm = this.formBuilder.group({
            quantity: ['', IndexPage.quantityValidator],
        });
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
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
                console.log(this.vegetablesToUpdate);
                console.log(this.vegetablesToUpdate[this.displayedVegetableIndex]);
            },
        );
    }

    protected submitQuantity(): void {

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
}
