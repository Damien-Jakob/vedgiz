import {Component, OnInit} from '@angular/core';
import {ApiCallerService} from "../../api-caller.service";
import {User} from "../../models/user";

// TODO disply more informations -> look what the apis can do

@Component({
    selector: 'app-me',
    templateUrl: './me.page.html',
    styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
    protected user: User;

    constructor(protected api: ApiCallerService) {
        this.user = new User();
        this.api.me().subscribe(
            answer => {
                this.user = answer.data;
            }
        )
    }

    ngOnInit() {
    }

}
