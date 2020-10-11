import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {User} from './models/user';
import {ApiTokenInterceptor} from './interceptors/ApiTokenInterceptor';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationProvider {
    protected APPLY_API = 'user/apply/';
    protected ME_API = 'me/';

    public user: User;

    protected token: string = null;

    constructor(
        protected storage: Storage,
        protected http: HttpClient,
    ) {
        this.loadToken().then(
            answer => {
                this.loadUser();
            }
        );
    }

    public getToken(): string {
        return this.token;
    }

    public loadToken(): Promise<string> {
        // We shouldn't use this in a callback, so we use a workaround
        const self: AuthenticationProvider = this;
        return this.storage.get('token').then(
            (token) => {
                self.token = token;
                ApiTokenInterceptor.setToken(token);
                return token;
            }
        );
    }

    public storeToken(token: string): Promise<any> {
        this.token = token;
        ApiTokenInterceptor.setToken(token);
        return this.storage.set('token', token);
    }

    public deleteToken(): Promise<any> {
        this.token = null;
        ApiTokenInterceptor.setToken(null);
        return this.storage.remove('token');
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
