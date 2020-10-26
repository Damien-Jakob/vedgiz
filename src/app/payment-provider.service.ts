import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PaymentProviderService {
    protected PAYMENT_API = 'payments/';
    protected VALIDATE_KEY_API = this.PAYMENT_API + 'valkey/';

    constructor(
        protected http: HttpClient,
    ) {
    }

    public submit(paymentData: object): Observable<any> {
        return this.http.post(this.url(this.PAYMENT_API), paymentData);
    }

    public validateKey(key: string): Observable<any> {
        return this.http.get(this.url(this.VALIDATE_KEY_API) + key);
    }

    protected url(api: string): string {
        return environment.api_root + api;
    }
}
