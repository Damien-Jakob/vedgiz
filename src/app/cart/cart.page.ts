import {Component, OnInit} from '@angular/core';
import {Vegetable} from "../models/vegetable";
import {ApiCallerService} from "../api-caller.service";
import {AlertController} from "@ionic/angular";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
    protected vegetables: Array<Vegetable>;
    protected cart: Array<any>;

    constructor(protected api: ApiCallerService, protected alertController: AlertController) {
        this.vegetables = new Array<Vegetable>();
        this.cart = new Array<any>();
    }

    ngOnInit() {
        this.api.getProducts().subscribe(
            answer => {
                this.vegetables = answer.data;
            },
            error => {
                this.alert("Erreur", "La liste des légumes n'a pas pu être chargée.");
            });

        // TODO load cart from local storage, if there is one
        this.cart = new Array<string>();
    }

    protected async alert(title: string, message: string) {
        const alert = await this.alertController.create({
            header: title,
            //subHeader: 'Subtitle',
            message: message,
            buttons: ['OK'],
        });

        await alert.present();
    }

}
