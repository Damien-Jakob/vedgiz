import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {User} from "./models/user";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationProvider {
    protected APPLY_API: string = "user/apply/";
    protected ME_API: string = "me/";

    public user: User;

    constructor(
        protected storage: Storage,
        protected http: HttpClient,
    ) {
        this.user = new User();
        this.loadUser();
    }

    public getToken(): Promise<string> {
        return this.storage.get('token');
    }

    public storeToken(token: string): Promise<any> {
        return this.storage.set('token', token);
    }

    public loadUser(): void {
        this.me().subscribe(
            answer => {
                this.user = answer.data;
            }
        );
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
