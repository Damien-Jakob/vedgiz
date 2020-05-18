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

    constructor(
        protected data: DataProvider,
        protected alertController: AlertController,
        protected router: Router,
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        // TODO use alert in case of problem when loading the vegetables
        this.data.loadVegetables().then(
            answer => {
                console.log('Vegetables loaded');
                console.log(answer);
            },
            error => {
                console.log('Failed to load vegetables');
                console.log(error);
            }
        );
    }

    // We use the router instead of the href to navigate because the href reloads the app,
    // and loses the previous page reference for the back button
    // We still keep the href for styling reasons
    protected toVegetable(event: Event, vegetable: Vegetable): void {
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
