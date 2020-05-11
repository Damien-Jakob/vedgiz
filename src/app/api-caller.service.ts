import {Injectable} from '@angular/core';
import {AuthenticationService} from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class ApiCallerService {

    constructor(protected authentication: AuthenticationService) {
    }
}
