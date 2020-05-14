import {Injectable} from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiCallerService {
    protected APPLY_API: string = "user/apply";
    protected ME_API: string = "me";
    protected PRODUCTS_API: string = "products";
    protected PICTURE_API: string = "product/picture/";

    constructor(
        protected authentication: AuthenticationService,
        protected http: HttpClient,
    ) {
    }

    public apply(applicationData: object): Observable<any> {
        return this.http.post(this.url(this.APPLY_API), applicationData);
    }

    public validateToken(token: string): Observable<any> {
        // Note that this cannot be just shortened in 1 line,
        // because {this.[...} considers this to identify the new object, not the apiCaller
        const headers: HttpHeaders = this.authentication.headersFromToken(token);
        return this.http.get(this.url(this.ME_API), {headers});
    }

    public me(): Observable<any> {
        const headers: HttpHeaders = this.authentication.headers();
        return this.http.get(this.url(this.ME_API), {headers});
    }

    public getProducts(): Observable<any> {
        const headers: HttpHeaders = this.authentication.headers();
        return this.http.get(this.url(this.PRODUCTS_API), {headers});
    }

    // Rem : do not use this, just use a direct link
    public getPicture(pictureName: string): Observable<any> {
        const headers: HttpHeaders = this.authentication.headers();
        return this.http.get(this.url(this.PRODUCTS_API) + pictureName, {headers});
    }

    protected url(api: string): string {
        return environment.api_root + api;
    }
}
