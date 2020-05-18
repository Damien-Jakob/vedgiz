import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationProvider {
    protected APPLY_API: string = "user/apply/";
    protected ME_API: string = "me/";

    constructor(
        protected storage: Storage,
        protected http: HttpClient,
    ) {
    }

    public getToken(): Promise<string> {
        return this.storage.get('token');
    }

    public storeToken(token: string): Promise<any> {
        return this.storage.set('token', token);
    }

    public apply(applicationData: object): Observable<any> {
        return this.http.post(this.url(this.APPLY_API), applicationData);
    }

    public me(): Observable<any> {
        return this.http.get(this.url(this.ME_API));
    }

    protected url(api: string): string {
        return environment.api_root + api;
    }
}
