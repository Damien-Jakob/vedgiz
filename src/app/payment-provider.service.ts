import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaymentProviderService {
    protected VEGETABLES_API = 'payments/';

    constructor() {
    }
}
