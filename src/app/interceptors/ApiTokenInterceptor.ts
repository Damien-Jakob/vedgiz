import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json charset=utf-8',
                Accept: 'application/json',
                Authorization: 'Bearer 25inl4IfpxLqjXqQ39rx78f8Fk3cJVwRE2EWz6ekBBE9hdU5k5U4CVPyM6W6', // valid
                //Authorization: 'Bearer 25inl4IfpxLqjXqQ39rx78f8Fk3cJVwRE2EWz6ekBBE9hdU5k5U4CVPyM6W6', // invalid
                //Authorization: null, // no token
            }
        });
        return next.handle(request);
    }
}
