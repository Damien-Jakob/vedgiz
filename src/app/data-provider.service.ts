import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataProvider {
    protected PICTURES_ROOT: string = "http://127.0.0.1:8000/storage/pictures/";

    constructor() {
    }

    public pictureUrl(pictureName: string): string {
        return this.PICTURES_ROOT + pictureName;
    }
}
