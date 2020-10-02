import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataProvider} from '../../data-provider.service';

@Component({
    selector: 'app-basket-show',
    templateUrl: './basket-show.page.html',
    styleUrls: ['./basket-show.page.scss'],
})
export class BasketShowPage implements OnInit {

    constructor(
        protected route: ActivatedRoute,
        protected data: DataProvider,
        protected router: Router,
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.data.clearBasket();

        const basketId: number = Number(this.route.snapshot.paramMap.get('id'));
        this.data.loadBasket(basketId);
        console.log('basket');
        console.log(this.data.basket);
    }

}
