import {Injectable} from '@angular/core';
import {DataProvider} from './data-provider.service';
import {Vegetable} from './models/vegetable';
import {Storage} from '@ionic/storage';
import {CartItem} from './models/cartItem';
import {PurchaseSent} from './models/purchaseSent';
import {PurchaseSentItem} from './models/purchaseSentItem';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CartProvider {
    protected readonly POST_CART_API = 'baskets/';

    public content: Array<CartItem>;

    constructor(
        protected data: DataProvider,
        protected storage: Storage,
        protected http: HttpClient,
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

    public removeVegetable(vegetableId: number): void {
        const vegetableIndex: number = this.content.findIndex(cartItem => cartItem.vegetable.id === vegetableId);
        if (vegetableIndex > -1) {
            this.content.splice(vegetableIndex, 1);
            this.save();
        }
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
                return self.content;
            }
        );
    }

    public totalPrice() {
        try {
            return this.content.reduce(
                (sum, cartItem) => sum += cartItem.vegetable.price * cartItem.quantity, 0
            );
        } catch (error) {
            // We don't want to have "this.content is undefined" error because the view tries to call it too soon
        }
    }

    public send(): Observable<any> {
        const data = this.toPurchaseSent();
        console.log('Data sent : ', data);
        return this.http.post(this.url(this.POST_CART_API), data);
    }

    protected toPurchaseSent(): PurchaseSent {
        const purchaseSentItems: PurchaseSentItem[] = this.content.map(cartItem =>
            new PurchaseSentItem(cartItem.vegetableId, cartItem.quantity)
        );
        return new PurchaseSent(purchaseSentItems);
    }

    protected url(api: string): string {
        return environment.api_root + api;
    }
}
