import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PaymentProviderService {
    protected PAYMENT_API = 'payments/';

    constructor(
        protected http: HttpClient,
    ) {
    }

    public submitPayment(paymentData: object): Observable<any> {
        return this.http.post(this.url(this.PAYMENT_API), paymentData);
    }

    protected url(api: string): string {
        return environment.api_root + api;
    }
}
