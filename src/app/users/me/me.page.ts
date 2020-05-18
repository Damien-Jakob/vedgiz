import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {AuthenticationProvider} from "../../authentication-provider.service";

// TODO display more informations -> look what the apis can do

@Component({
    selector: 'app-me',
    templateUrl: './me.page.html',
    styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
    constructor(protected authentication: AuthenticationProvider, protected router: Router) {
    }

    ngOnInit() {
    }

    protected toVegetables() {
        this.router.navigate(['/vegetables']);
    }

    protected toCart() {
        this.router.navigate(['/cart']);
    }

}
