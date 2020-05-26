import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartProvider {
    public content: Array<any>;

    constructor() {
        // TODO load cart from local storage, if there is one
        this.content = new Array<any>();
    }
}
