import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-error',
    templateUrl: './error.page.html',
    styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {
    protected error: string;

    constructor(protected route: ActivatedRoute) {
        this.error = "";
        this.error = this.route.snapshot.paramMap.get('errorCategory');
    }

    ngOnInit() {
    }

    protected displayError(): string {
        let errorMessage: string = "";
        switch (this.error) {
            case "invalid-token":
                errorMessage = "Votre jeton d'identification est invalide.";
                break;
            default:
                errorMessage = "";
        }
        return errorMessage;
    }
}
