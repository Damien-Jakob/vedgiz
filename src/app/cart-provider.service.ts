import {Injectable} from '@angular/core';
import {DataProvider} from "./data-provider.service";
import {Vegetable} from "./models/vegetable";

@Injectable({
    providedIn: 'root'
})
export class CartProvider {
    public content: Array<any>;

    constructor(protected data: DataProvider) {
        // TODO load cart from local storage, if there is one
        this.content = new Array<any>();
    }

    public addVegetable(vegetableId): void {
        this.content.push({
            vegetable: this.data.find(vegetableId),
        });
        console.log(this.data.find(vegetableId));
    }

    // Get all vegetables not in the cart
    public selectableVegetables(): Array<Vegetable> {
        return this.data.vegetables.filter(vegetable =>
            // Is the vegetable not in the cart ?
            this.content.find(cartItem => cartItem.vegetable.id == vegetable.id) == undefined
        );
    }
}
