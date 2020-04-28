import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public welcomeMessage : string = "Bonjour";
  public welcomePerson : string;
  public isFemale : boolean;
  public isVip : boolean;
  public games : string[];

  constructor() {
    this.welcomePerson = "Lennon";
    this.isFemale = false;
    this.isVip = true;
    this.games = [
        "Skyrim",
        "Totally accurate battles simulator",
        "Minecraft!!",
    ]
  }

}
