export class PurchaseSentItem {
    'product_id': string;
    'quantity': string;

    constructor(productId: number, quantity: number) {
        this.product_id = productId.toString();
        this.quantity = quantity.toString();
    }
}
