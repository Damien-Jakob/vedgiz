import {Component, OnInit} from '@angular/core';
import {Vegetable} from '../../models/vegetable';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {DataProvider} from '../../data-provider.service';

// TODO Permettre d'ajouter au panier depuis cette page (non prioritaire)

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

    // We want to reload the vegetables every time we visit the page, in case there has been an update
    ionViewWillEnter() {
        this.data.loadVegetables().then(
            answer => {
                console.log('Vegetables loaded');
                console.log(answer);
            },
            error => {
                this.alert('Erreur', 'La liste des légumes n\'a pas pu être chargée.');
            }
        );
    }

    // We use the router instead of the href to navigate because the href reloads the app,
    // and loses the previous page reference for the back button
    // We still keep the href for styling reasons
    protected toVegetable(event: Event, vegetable: Vegetable): void {
        event.preventDefault();
        this.router.navigate(['/vegetables', vegetable.id]);
    }

    protected async alert(title: string, message: string) {
        const alert = await this.alertController.create({
            header: title,
            // subHeader: 'Subtitle',
            message,
            buttons: ['OK'],
        });

        await alert.present();
    }
}
