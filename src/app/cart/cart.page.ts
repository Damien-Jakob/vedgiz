import {Component, OnInit} from '@angular/core';
import {Vegetable} from '../models/vegetable';
import {AlertController} from '@ionic/angular';
import {CartProvider} from '../cart-provider.service';
import {DataProvider} from '../data-provider.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CartItem} from '../models/cartItem';
import {Router} from '@angular/router';

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
        protected formBuilder: FormBuilder,
        protected router: Router,
    ) {
        this.selectableVegetables = new Array<Vegetable>();
        this.formGroup = formBuilder.group({});
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.data.loadVegetables().then(
            answer => {
                this.setSelectableVegetables();
            },
            error => {
                this.alert('Erreur', 'La liste des légumes n\'a pas pu être chargée.');
            }
        );

        this.loadForm();
    }

    protected addSelectedToCart() {
        this.cart.addVegetable(this.selectedVegetableId);

        this.addFormInput(this.cart.content[this.cart.content.length - 1]);

        // remove the vegetable from selectable vegetables
        this.setSelectableVegetables();
        // Try to unselect the vegetable
        this.selectedVegetableId = null;
    }

    protected deleteCartItem(vegetableId: number): void {
        this.formGroup.removeControl(vegetableId.toString());
        this.cart.removeVegetable(vegetableId);
        this.setSelectableVegetables();
    }

    protected deleteAllCartItems() {
        while (this.cart.content.length > 0) {
            const cartItem: CartItem = this.cart.content[0];
            this.deleteCartItem(+cartItem.vegetableId);
        }
    }

    protected onQuantityChange(vegetableId: number, newQuantity: number) {
        this.cart.updateQuantity(vegetableId, newQuantity);
    }

    protected setSelectableVegetables(): void {
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

    protected loadForm() {
        this.cart.content.forEach(cartItem => {
            this.addFormInput(cartItem);
        });
    }

    protected addFormInput(cartItem: CartItem) {
        this.formGroup.addControl(
            cartItem.vegetable.id.toString(),
            new FormControl(cartItem.quantity, [
                    Validators.min(0.01),
                    Validators.required,
                ]
            )
        );
    }

    protected isValid(): boolean {
        return this.formGroup.valid
            && this.cart.content !== undefined
            && this.cart.content.length > 0;
    }

    // TODO move submission to cart provider (keep redirection here)
    protected submit(): void {
        console.log('submit');
        this.cart.send().subscribe(
            answer => {
                this.data.latestBasket().then(basket => {
                        this.router.navigate(['/basket', basket.id]);
                        this.deleteAllCartItems();
                    }
                );
            },
            error => {
                console.log('Error : ', error.error);
                console.log(error);

                this.alert('Erreur', 'Produit non trouvé');
            }
        );
    }
}
