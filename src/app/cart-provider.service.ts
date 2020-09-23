import {Injectable} from '@angular/core';
import {DataProvider} from './data-provider.service';
import {Vegetable} from './models/vegetable';
import {Storage} from '@ionic/storage';
import {CartItem} from './models/cartItem';

@Injectable({
    providedIn: 'root'
})
export class CartProvider {
    public content: Array<CartItem>;

    constructor(
        protected data: DataProvider,
        protected storage: Storage
    ) {
        this.load();
    }

    public addVegetable(vegetableId: number): void {
        this.content.push({
            // vegetableId: vegetableId,
            vegetableId,
            quantity: 1,
            // TODO find way to not need to store the vegetable anymore
            vegetable: this.data.find(vegetableId),
        });
        this.save();
    }

    public updateQuantity(vegetableId, quantity): void {
        this.content.find(contentItem =>
            contentItem.vegetableId === vegetableId
        ).quantity = quantity;
        this.save();
    }

    // Get all vegetables not in the cart
    public selectableVegetables(): Array<Vegetable> {
        return this.data.vegetables.filter(vegetable =>
            // Is the vegetable not in the cart ?
            this.content.find(cartItem => cartItem.vegetable.id === vegetable.id) === undefined
        );
    }

    public save(): Promise<any> {
        console.log('saving cart');
        return this.storage.set('cart', this.content);
    }

    public load(): Promise<any> {
        const self: CartProvider = this;
        return this.storage.get('cart').then(
            (cart) => {
                if (!(cart === null)) {
                    self.content = cart;
                } else {
                    self.content = new Array<any>();
                }
                console.log(self.content);
                return self.content;
            }
        );
    }
}
