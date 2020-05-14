import {Component, OnInit} from '@angular/core';
import {ApiCallerService} from "../../api-caller.service";
import {Vegetable} from "../../models/vegetable";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {DataProvider} from "../../data-provider.service";

@Component({
    selector: 'app-vegetables-index',
    templateUrl: './vegetables-index.page.html',
    styleUrls: ['./vegetables-index.page.scss'],
})
export class VegetablesIndexPage implements OnInit {
    protected vegetables: Array<Vegetable>;

    constructor(
        protected api: ApiCallerService,
        protected alertController: AlertController,
        protected router: Router,
        protected data: DataProvider,
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

    // We use the router instead of the href to navigate because the href reloads the app,
    // and loses the previous page reference for the back button
    // We still keep the href for styling reasons
    protected toDetail(event: Event, vegetable: Vegetable): void {
        event.preventDefault();
        this.router.navigate(['/vegetables', vegetable.id])
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
