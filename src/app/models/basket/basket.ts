import {BasketItem} from './basketItem';

export class Basket {
    'id': number;
    'purchases': Array<BasketItem>;
    'created_at': string;
    'updated_at': string;
}
