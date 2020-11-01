import { DISHES } from './../shared/dishes';
import { Dish } from './../shared/dish';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes() : Dish[]{
    return DISHES;
  }

  

}
