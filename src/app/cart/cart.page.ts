import {Component, OnInit} from '@angular/core';
import {Vegetable} from "../models/vegetable";
import {AlertController} from "@ionic/angular";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartProvider} from "../cart-provider.service";
import {DataProvider} from "../data-provider.service";


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
        this.selectableVegetables = new Array<Vegetable>();
    }

    ngOnInit() {
        this.cartItemsForms = this.formBuilder.array([this.createCartItemForm()]);

        this.cartForm = this.formBuilder.group({
            cartItems: this.cartItemsForms,
        });
    }

    ionViewWillEnter() {
        this.data.loadVegetables().then(
            answer => {
                this.setSelectableVegetables();
            },
            error => {
                this.alert("Erreur", "La liste des légumes n'a pas pu être chargée.");
            }
        )
    }

    protected createCartItemForm(): FormGroup {
        return this.formBuilder.group({
            vegetableQuantity: [1, Validators.compose([
                Validators.required,
                Validators.min(1),
            ])],
        });
    }

    addCartItem(): void {
        this.cartItemsForms = this.cartForm.get('cartitems') as FormArray;
        this.cartItemsForms.push(this.createCartItemForm());
    }

    protected addSelectedToCart() {
        // We have to add a new entry to the form array in order to display the vegetable correctly
        this.cartItemsForms.push(this.createCartItemForm());

        // TODO move logic to cart provider
        this.cart.content.push({
            vegetable: this.data.find(this.selectedVegetableId),
        });
        console.log(this.data.find(this.selectedVegetableId));

        // remove the vegetable from selectable vegetables
        this.setSelectableVegetables();
        // Try to unselect the vegetable
        this.selectedVegetableId = null;
    }

    // Set selectableVegetables to all vegetables not in the cart
    protected setSelectableVegetables(): void {
        this.selectableVegetables = this.data.vegetables.filter(vegetable =>
            // Is the vegetable not in the cart ?
            this.cart.content.find(cartItem => cartItem.vegetable.id == vegetable.id) == undefined
        );
    }

    protected async alert(title: string, message: string) {
        const alert = await this.alertController.create({
            header: title,
            //subHeader: 'Subtitle',
            message: message,
            buttons: ['OK'],
        });

        await alert.present();
    }

}
