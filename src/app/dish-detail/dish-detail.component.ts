import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';
import { Component, Input, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dish: Dish;
  dishIds: string [];
  prev: string;
  next: string;

  constructor(private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.dishService.getDishIds()
    .subscribe(dishIds => this.dishIds = dishIds);
<<<<<<< HEAD
   this.route.params
   .pipe(switchMap((params: Params) => this.dishService.getDish(params['id']) ))
=======
   this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id']) ))
>>>>>>> 9f0898e99f1c5adc75226f738d1d4d08756009d0
   .subscribe((dish) => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1 ) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1  ) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
