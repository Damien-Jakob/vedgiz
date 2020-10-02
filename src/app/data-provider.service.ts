import {Injectable} from '@angular/core';
import {Vegetable} from './models/vegetable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {BasketList} from './models/basket/basketlist';
import {Basket} from './models/basket/basket';

@Injectable({
    providedIn: 'root'
})
export class DataProvider {
    public vegetables: Array<Vegetable>;
    public vegetable: Vegetable;
    public baskets: BasketList;
    public basket: Basket;

    protected VEGETABLES_API = 'products/';
    protected BASKETS_API = 'baskets/';
    protected PICTURE_API = 'product/picture/';

    constructor(protected http: HttpClient) {
        this.vegetables = new Array<Vegetable>();
        this.clearVegetable();
        this.clearBasket();
        this.loadVegetables();
        this.latestBasket();
    }

    public loadVegetables(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.http.get(this.url(this.VEGETABLES_API)).subscribe(
                (response: any) => {
                    console.log(response);
                    this.vegetables = response.data;
                    resolve(this.vegetables);
                },
                error => {
                    // TODO deal with error
                    console.log(error);
                    reject();
                }
            );
        });
    }

    public clearVegetable(): void {
        this.vegetable = new Vegetable();
    }

    public loadVegetable(id: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.http.get(this.url(this.VEGETABLES_API + id)).subscribe(
                (response: any) => {
                    console.log('response');
                    console.log(response);
                    this.vegetable = response.data;
                    console.log('vegetable');
                    console.log(this.vegetable);
                },
                error => {
                    // TODO deal with error
                    console.log(error);
                }
            );
        });
    }

    public findVegetable(id: number): Vegetable {
        return this.vegetables.find(
            vegetable => vegetable.id == id
        );
    }

    public loadBaskets(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.http.get(this.url(this.BASKETS_API)).subscribe(
                (response: any) => {
                    console.log(response);
                    this.baskets = response.data;
                    resolve(this.baskets);
                },
                error => {
                    // TODO deal with error
                    console.log(error);
                    reject();
                }
            );
        });
    }

    public latestBasket(): Promise<any> {
        return this.loadBaskets().then(
            answer => {
                console.log(answer);
                // TODO do it by checking the created_at value
                this.basket = answer[answer.length - 1];
                return this.basket;
            }
        );
    }

    public clearBasket(): void {
        this.basket = new Basket();
    }

    public loadBasket(id: number): Promise<Basket> {
        return new Promise<any>((resolve, reject) => {
            this.loadBaskets().then(answer => {
                    console.log(this.findBasket(id));
                    return this.findBasket(id);
                }
            );
        });
    }

    public findBasket(id: number): Basket {
        return this.baskets.find(
            basket => basket.id == id
        );
    }

    public pictureUrl(pictureName: string): string {
        return environment.picture_root + pictureName;
    }

    protected url(api: string): string {
        return environment.api_root + api;
    }
}
