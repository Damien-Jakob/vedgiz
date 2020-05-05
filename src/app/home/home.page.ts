import {Component} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    private todo: FormGroup;

    public welcomeMessage: string = "Bonjour";
    public welcomePerson: string;
    public isFemale: boolean;
    public isVip: boolean;
    public games: string[];

    constructor(private formBuilder: FormBuilder) {
        this.todo = this.formBuilder.group({
            title: ['', Validators.required],
            description: [''],
        });

        this.welcomePerson = "Lennon";
        this.isFemale = false;
        this.isVip = true;
        this.games = [
            "Skyrim",
            "Totally accurate battles simulator",
            "Minecraft!!",
        ]
    }

    logForm() {
        console.log(this.todo.value)
    }

}
