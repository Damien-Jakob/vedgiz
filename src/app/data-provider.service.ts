import {Injectable} from '@angular/core';
import {Vegetable} from "./models/vegetable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataProvider {
    public vegetables: Array<Vegetable>;
    public vegetable: Vegetable;

    protected VEGETABLES_API: string = "products/";
    protected PICTURE_API: string = "product/picture/";

    constructor(protected http: HttpClient) {
        this.vegetables = new Array<Vegetable>();
        this.loadVegetables();
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

    public find(id: number): Promise<Vegetable> {
        return new Promise<Vegetable>((resolve, reject) => {
                resolve(
                    this.vegetables.find(
                        vegetable => vegetable.id == id
                    )
                );
                reject();
            }
        );
    }

    public pictureUrl(pictureName: string): string {
        return environment.picture_root + pictureName;
    }

    protected url(api: string): string {
        return environment.api_root + api;
    }
}
