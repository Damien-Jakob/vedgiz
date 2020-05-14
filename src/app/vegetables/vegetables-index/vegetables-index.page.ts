import {Component, OnInit} from '@angular/core';
import {ApiCallerService} from "../../api-caller.service";
import {Vegetable} from "../../models/vegetable";
import {AlertController} from "@ionic/angular";

@Component({
    selector: 'app-vegetables-index',
    templateUrl: './vegetables-index.page.html',
    styleUrls: ['./vegetables-index.page.scss'],
})
export class VegetablesIndexPage implements OnInit {
    protected vegetables: Array<Vegetable>;

    constructor(
        protected api: ApiCallerService,
        protected alertController: AlertController
    ) {
        this.vegetables = new Array<Vegetable>();
    }

    ngOnInit() {
        this.api.getProducts().subscribe(
            answer => {
                this.vegetables = answer.data;
                console.log(this.vegetables);
            },
            error => {
                this.alert("Erreur", "La liste des légumes n'a pas pu être chargée.");
            });
    }

    private async alert(title: string, message: string) {
        const alert = await this.alertController.create({
            header: title,
            //subHeader: 'Subtitle',
            message: message,
            buttons: ['OK'],
        });

        await alert.present();
    }
}
