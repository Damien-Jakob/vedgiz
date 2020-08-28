import {Injectable} from '@angular/core';
import {DataProvider} from './data-provider.service';
import {Vegetable} from './models/vegetable';

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
            // vegetableId: vegetableId,
            vegetableId,
            quantity: 1,
            // TODO find way to not need to store the vegetable anymore
            vegetable: this.data.find(vegetableId),
        });
    }

    public updateQuantity(vegetableId, quantity) {
        this.content.find(contentItem =>
          contentItem.vegetableId === vegetableId
        ).quantity = quantity;
    }

    // Get all vegetables not in the cart
    public selectableVegetables(): Array<Vegetable> {
        return this.data.vegetables.filter(vegetable =>
            // Is the vegetable not in the cart ?
            this.content.find(cartItem => cartItem.vegetable.id === vegetable.id) === undefined
        );
    }
}
