import {Injectable} from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiCallerService {
    protected API_ROOT: string = "http://127.0.0.1:8000/api/";
    protected APPLY_API: string = "user/apply"
    protected ME_API: string = "me";

    constructor(
        protected authentication: AuthenticationService,
        protected http: HttpClient,
    ) {

    }

    protected url(api: string): string {
        return this.API_ROOT + api;
    }

    public apply(applicationData: object): Observable<object> {
        return this.http.post(this.url(this.APPLY_API), applicationData);
    }

    public validateToken(token: string): Observable<object> {
      // Note that this cannot be just shortened in 1 line,
      // because {this.[...} considers this to identify the new object, not the apiCaller
        const headers: HttpHeaders = this.authentication.headersFromToken(token);
        return this.http.get(this.url(this.ME_API), {headers});
    }

    public me(): Observable<object> {
        const headers: HttpHeaders = this.authentication.headers();
        return this.http.get(this.url(this.ME_API), {headers});
    }
}
