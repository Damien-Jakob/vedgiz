import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-vegetables',
    templateUrl: './vegetables.page.html',
    styleUrls: ['./vegetables.page.scss'],
})
export class VegetablesPage implements OnInit {

    public vegetables: Observable<any>;

    constructor(public httpClient: HttpClient) {
        this.vegetables = this.httpClient.get('assets/data.ts');
        this.vegetables.subscribe(data => {
            console.log('my data: ', data);
        });
    }

    ngOnInit() {
    }

}
