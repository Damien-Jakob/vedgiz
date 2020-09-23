import {Component, OnInit} from '@angular/core';
import {Vegetable} from '../models/vegetable';
import {AlertController} from '@ionic/angular';
import {CartProvider} from '../cart-provider.service';
import {DataProvider} from '../data-provider.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CartItem} from '../models/cartItem';


@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    protected selectableVegetables: Array<Vegetable>;
    protected selectedVegetableId: number = null;

    protected formGroup: FormGroup;

    constructor(
        protected data: DataProvider,
        protected cart: CartProvider,
        protected alertController: AlertController,
        protected formBuilder: FormBuilder
    ) {
        console.log('Cart page constructed');
        this.selectableVegetables = new Array<Vegetable>();
        this.formGroup = formBuilder.group({});
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

        this.cart.content.forEach(cartItem => {
            this.addFormInput(cartItem);
        });
    }

    protected addSelectedToCart() {
        this.cart.addVegetable(this.selectedVegetableId);

        this.addFormInput(this.cart.content[this.cart.content.length - 1]);

        // remove the vegetable from selectable vegetables
        this.setSelectableVegetables();
        // Try to unselect the vegetable
        this.selectedVegetableId = null;

        console.log(this.cart.content);
    }

    // TODO implementation
    protected deleteCartItem(vegetableid: number): void {
        console.log('Deleting cart item : ' + vegetableid);
    }

    protected onQuantityChange(vegetableId: number, newQuantity: number) {
        console.log('onQuantityChange');

        this.cart.updateQuantity(vegetableId, newQuantity);

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

    addFormInput(cartItem: CartItem) {
        this.formGroup.addControl(
            cartItem.vegetable.id.toString(),
            new FormControl(cartItem.quantity, [
                    Validators.min(0.01),
                    Validators.required,
                ]
            )
        );
    }
}
