import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';

import { Component, Input, OnInit } from '@angular/core';

import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dish: Dish;

  constructor(private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.dishService.getDish(id)
      .subscribe((dish) => this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }

}
