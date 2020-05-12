import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor() {
    }

    public token(): string {
        // TODO get token from local storage
        const token: string = "25inl4IfpxLqjXqQ39rx78f8Fk3cJVwRE2EWz6ekBBE9hdU5k5U4CVPyM6W6"; // valid
        //const token: string = "25inl4IfpxLqjXqQ39rx78f8Fk3cJVwRE2EWz6ekBBE9hdU5k5U4CVPyM6W7"; // invalid
        //const token : string = null; // no token
        return token;
    }

    public hasToken(): boolean {
        return isNotNullOrUndefined(this.token());
    }

    /*
    header :
    authorization -> Bearer ~token~

    Test of the token : try the /api/me API

    * No token : Unauthenticated (401)
    * Bad token : Invalid Token (401)
    */
    public headers(): HttpHeaders {
        return this.headersFromToken(this.token());
    }

    public headersFromToken(token: string): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
        });
    }
}
