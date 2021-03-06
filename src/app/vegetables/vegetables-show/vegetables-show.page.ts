import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {DataProvider} from '../../data-provider.service';
import {CartProvider} from '../../cart-provider.service';

@Component({
    selector: 'app-vegetables-show',
    templateUrl: './vegetables-show.page.html',
    styleUrls: ['./vegetables-show.page.scss'],
})
export class VegetablesShowPage implements OnInit {
    constructor(
        protected route: ActivatedRoute,
        protected data: DataProvider,
        protected cart: CartProvider,
        protected alertController: AlertController,
        protected router: Router,
    ) {
    }

    ngOnInit() {
    }

    // We want to reload the vegetables every time we visit the page, in case there has been an update
    ionViewWillEnter() {
        // We don't want to display the previous vegetable
        this.data.clearVegetable();

        const vegetableId: number = Number(this.route.snapshot.paramMap.get('id'));
        this.data.loadVegetable(vegetableId).then(
            answer => {
                console.log('Vegetable loaded');
                console.log(answer);
            },
            error => {
                this.alert('Erreur', 'Le légume n\'a pas pu être chargé.');
            }
        );
    }

    protected async alert(title: string, message: string) {
        const alert = await this.alertController.create({
            header: title,
            // subHeader: 'Subtitle',
            message: message,
            buttons: ['OK'],
        });

        await alert.present();
    }

    protected addToCart() {
        this.cart.addVegetable(this.data.vegetable.id);
        this.router.navigate(['/cart']);
    }
}
