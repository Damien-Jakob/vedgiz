import {Component, OnInit} from '@angular/core';
import {Vegetable} from '../models/vegetable';
import {AlertController} from '@ionic/angular';
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

    constructor(
        protected data: DataProvider,
        protected cart: CartProvider,
        protected alertController: AlertController,
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

    protected addSelectedToCart() {
        this.cart.addVegetable(this.selectedVegetableId);
        // remove the vegetable from selectable vegetables
        this.setSelectableVegetables();
        // Try to unselect the vegetable
        this.selectedVegetableId = null;

        console.log(this.cart.content);
    }

    // TODO add input validation
    protected onQuantityChange(vegetableId: number, $event) {
        console.log('onQuantityChange');

        this.cart.save();

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
