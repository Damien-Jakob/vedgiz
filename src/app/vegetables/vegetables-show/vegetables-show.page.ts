import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Vegetable} from "../../models/vegetable";
import {ApiCallerService} from "../../api-caller.service";
import {AlertController} from "@ionic/angular";
import {DataProvider} from "../../data-provider.service";

@Component({
    selector: 'app-vegetables-show',
    templateUrl: './vegetables-show.page.html',
    styleUrls: ['./vegetables-show.page.scss'],
})
export class VegetablesShowPage implements OnInit {
    protected vegetable: Vegetable;

    constructor(
        protected route: ActivatedRoute,
        protected alertController: AlertController,
        protected data: DataProvider,
    ) {
        this.vegetable = new Vegetable();
    }

    ngOnInit() {
        const vegetableId: number = Number(this.route.snapshot.paramMap.get('id'));
        this.data.loadVegetable(vegetableId);
        /*
        this.api.getProduct(vegetableId).subscribe(
            answer => {
                this.vegetable = answer.data;
            },
            error => {
                this.alert("Erreur", "Le légume n'a pas pu être chargé.");
            }
        );

         */
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
