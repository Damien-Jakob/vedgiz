import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Vegetable} from "../../models/vegetable";
import {ApiCallerService} from "../../api-caller.service";
import {AlertController} from "@ionic/angular";

@Component({
    selector: 'app-vegetables-show',
    templateUrl: './vegetables-show.page.html',
    styleUrls: ['./vegetables-show.page.scss'],
})
export class VegetablesShowPage implements OnInit {
    // TODO use a service for that
    protected PICTURES_ROOT: string = "http://127.0.0.1:8000/storage/pictures/";

    protected vegetable: Vegetable;

    constructor(
        protected route: ActivatedRoute,
        protected api: ApiCallerService,
        protected alertController: AlertController,
    ) {
        this.vegetable = new Vegetable();
    }

    ngOnInit() {
        const vegetableId: string = this.route.snapshot.paramMap.get('id');
        this.api.getProduct(vegetableId).subscribe(
            answer => {
                this.vegetable = answer.data;
            },
            error => {
                this.alert("Erreur", "Le légume n'a pas pu être chargé.");
            }
        );
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

    protected pictureUrl(pictureName: string): string {
        return this.PICTURES_ROOT + pictureName;
    }

}
