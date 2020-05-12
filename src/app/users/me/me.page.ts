import {Component, OnInit} from '@angular/core';
import {ApiCallerService} from "../../api-caller.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";

// TODO display more informations -> look what the apis can do

@Component({
    selector: 'app-me',
    templateUrl: './me.page.html',
    styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
    protected user: User;

    constructor(protected api: ApiCallerService, protected router: Router) {
        this.user = new User();
    }

    ngOnInit() {
        this.api.me().subscribe(
            answer => {
                this.user = answer.data;
            }
        );
    }

    protected toVegetables() {
        this.router.navigate(['/vegetables']);
    }

}
