import { Dish } from './../shared/dish';
import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  @Input() 
  dish: Dish;

  constructor() { }

  ngOnInit(): void {
  }

}
