import {PurchaseSentItem} from './purchaseSentItem';

export class PurchaseSent {
    purchases: PurchaseSentItem[];

    constructor(purchase: PurchaseSentItem[]) {
        this.purchases = purchase;
    }
}