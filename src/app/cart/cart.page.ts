import {Component, OnInit} from '@angular/core';
import {Vegetable} from "../models/vegetable";
import {ApiCallerService} from "../api-caller.service";
import {AlertController} from "@ionic/angular";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    protected vegetables: Array<Vegetable>;
    protected selectableVegetables: Array<Vegetable>;
    protected selectedVegetableId: number = null;
    protected cart: Array<any>;

    constructor(protected api: ApiCallerService, protected alertController: AlertController) {
        this.vegetables = new Array<Vegetable>();
        this.selectableVegetables = new Array<Vegetable>();
        this.cart = new Array<any>();
    }

    ngOnInit() {
        this.api.getProducts().subscribe(
            answer => {
                this.vegetables = answer.data;
                this.setSelectableVegetables();
            },
            error => {
                this.alert("Erreur", "La liste des légumes n'a pas pu être chargée.");
            });

        // TODO load cart from local storage, if there is one
        this.cart = new Array<string>();
        this.setSelectableVegetables();
    }

    protected addSelectedToCart() {
        console.log(this.selectedVegetableId);
        this.cart.push({
            vegetable: this.vegetable(this.selectedVegetableId),
        });
        // remove the vegetable from selectable vegetables
        this.setSelectableVegetables();
        // Try to unselect the vegetable
        this.selectedVegetableId = null;

        console.log(this.cart);
        console.log(this.selectableVegetables);
    }

    protected vegetable(id: number): Vegetable {
        return this.vegetables.find(vegetable => vegetable.id == id);
    }

    // Set selectableVegetables to all vegetables not in the cart
    protected setSelectableVegetables(): void {
        this.selectableVegetables = this.vegetables.filter(vegetable =>
            // Is the vegetable not in the cart ?
            this.cart.find(cartItem => cartItem.vegetable.id == vegetable.id) == undefined
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
