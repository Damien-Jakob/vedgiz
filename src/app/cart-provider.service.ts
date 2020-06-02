import {Injectable} from '@angular/core';
import {DataProvider} from "./data-provider.service";

@Injectable({
    providedIn: 'root'
})
export class CartProvider {
    public content: Array<any>;

    constructor(protected data: DataProvider) {
        // TODO load cart from local storage, if there is one
        this.content = new Array<any>();
    }
    
    public addVegetable(vegetableId) {
        this.content.push({
            vegetable: this.data.find(vegetableId),
        });
        console.log(this.data.find(vegetableId));
    }
}
