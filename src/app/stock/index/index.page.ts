import {Component, OnInit} from '@angular/core';
import {DataProvider} from '../../data-provider.service';
import {Vegetable} from '../../models/vegetable';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
    protected vegetablesToUpdate = new Array<Vegetable>();
    protected displayedVegetableIndex: number;

    constructor(
        protected data: DataProvider,
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.data.loadVegetables().then(
            answer => {
                console.log('Vegetables loaded');
                console.log(answer);
                this.vegetablesToUpdate = new Array<Vegetable>();
                for (let i = 0; i < answer.length; i++) {
                    this.vegetablesToUpdate[i] = answer[i];
                }
                this.displayedVegetableIndex = 0;
                console.log(this.vegetablesToUpdate);
                console.log(this.vegetablesToUpdate[this.displayedVegetableIndex]);
            },
        );
    }
}
