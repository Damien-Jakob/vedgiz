import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.page.html',
  styleUrls: ['./vegetables.page.scss'],
})
export class VegetablesPage implements OnInit {

  public vegetables;

  constructor() {
    this.vegetables = ['a', 'b'];
  }

  ngOnInit() {
  }

}
