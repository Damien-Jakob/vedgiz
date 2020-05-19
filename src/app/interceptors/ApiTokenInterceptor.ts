import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationProvider} from "../authentication-provider.service";

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
    // TODO find a way to use the authentication-provider
    protected static token = null;

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /*
        console.log('Requete http :');
        console.log(request);
         */
        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json charset=utf-8',
                Accept: 'application/json',
                Authorization: `Bearer ${ApiTokenInterceptor.token}`,
                //Authorization: 'Bearer 25inl4IfpxLqjXqQ39rx78f8Fk3cJVwRE2EWz6ekBBE9hdU5k5U4CVPyM6W6', // valid
                //Authorization: 'Bearer 25inl4IfpxLqjXqQ39rx78f8Fk3cJVwRE2EWz6ekBBE9hdU5k5U4CVPyM6W6', // invalid
                //Authorization: null, // no token
            }
        });
        return next.handle(request);
    }

    public static setToken(token): void {
        ApiTokenInterceptor.token = token;
    }
}
