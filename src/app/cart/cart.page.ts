import {Component, OnInit} from '@angular/core';
import {Vegetable} from '../models/vegetable';
import {AlertController} from '@ionic/angular';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartProvider} from '../cart-provider.service';
import {DataProvider} from '../data-provider.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    protected selectableVegetables: Array<Vegetable>;
    protected selectedVegetableId: number = null;

    protected cartForm: FormGroup;
    protected cartItemsForms: FormArray;

    constructor(
        protected data: DataProvider,
        protected cart: CartProvider,
        protected alertController: AlertController,
        protected formBuilder: FormBuilder,
    ) {
        console.log('Cart page constructed');
        this.selectableVegetables = new Array<Vegetable>();
    }

    ngOnInit() {
        console.log('Cart page ngOnInit');
    }

    ionViewWillEnter() {

        console.log('Cart page ionViewWillEnter');
        this.data.loadVegetables().then(
            answer => {
                this.setSelectableVegetables();

                console.log(this.cart.content);
            },
            error => {
                this.alert('Erreur', 'La liste des légumes n\'a pas pu être chargée.');
            }
        );
    }

    protected createCartItemForm(): FormGroup {
        // in http
        // formControlName="vegetableQuantity"
        console.log('createCartItemForm');
        return this.formBuilder.group({
            vegetableQuantity: [1, Validators.compose([
                Validators.required,
                Validators.min(1),
            ])],
        });
    }

    protected addCartItem(): void {
        console.log('addCartItem');
        this.cartItemsForms = this.cartForm.get('cartitems') as FormArray;
        this.cartItemsForms.push(this.createCartItemForm());
    }

    protected addSelectedToCart() {
        this.cart.addVegetable(this.selectedVegetableId);
        // remove the vegetable from selectable vegetables
        this.setSelectableVegetables();
        // Try to unselect the vegetable
        this.selectedVegetableId = null;

        console.log(this.cart.content);
    }

    protected onQuantityChange(vegetableId: number, $event) {
        console.log('onQuantityChange');
        this.cart.updateQuantity(vegetableId, $event.target.value);

        console.log(this.cart.content);
    }

    protected setSelectableVegetables(): void {
        console.log('setSelectableVegetable');
        this.selectableVegetables = this.cart.selectableVegetables();
    }

    protected async alert(title: string, message: string) {
        const alert = await this.alertController.create({
            header: title,
            // subHeader: 'Subtitle',
            message,
            buttons: ['OK'],
        });

        await alert.present();
    }

}
