import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor() {
    }

    protected token(): string {
        // TODO get token from local storage
        const token: string = "25inl4IfpxLqjXqQ39rx78f8Fk3cJVwRE2EWz6ekBBE9hdU5k5U4CVPyM6W6";
        //const token : string = null;
        return token;
    }

    public headers(): HttpHeaders {
        return this.headersFromToken(this.token());
    }

    public headersFromToken(token: string): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
        });
    }
}
