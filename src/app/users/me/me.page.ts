import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationProvider} from '../../authentication-provider.service';
import {DataProvider} from '../../data-provider.service';

@Component({
    selector: 'app-me',
    templateUrl: './me.page.html',
    styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
    constructor(
        protected authentication: AuthenticationProvider,
        protected data: DataProvider,
        protected router: Router,
    ) {
    }

    ngOnInit() {
    }

    // Load the data every time the page is visited in case there has been an update
    ionViewWillEnter() {
        this.authentication.loadUser();
        this.data.loadBalance().then(answer => {
            console.log(this.data.balance);
        });
    }

    protected toVegetables() {
        this.router.navigate(['/vegetables']);
    }

    protected toCart() {
        this.router.navigate(['/cart']);
    }

}
