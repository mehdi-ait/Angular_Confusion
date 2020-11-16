import { Comment } from './../shared/comment';
import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';
import { Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import {FormBuilder,FormGroup, NgForm, Validators} from '@angular/forms';
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
  dishCopy: Dish;
  errMess: string;


  ratingForm: FormGroup;
  @ViewChild('fform') ratingFormDirective:NgForm;

  formErrors = {
    'author' : '',
    'comment' : ''
  };

  validationMessages = {
    'author' : {
      'required' : 'Author name is required',
      'minlength' : 'Author name  must be at least 2 characters long'
    },
    'comment' : {
      'required' : 'Comment is required',
      'minlength' : 'Comment must be at least 2 characters long'
    }
  
  };




  constructor(private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
      this.createForm();
     }

  ngOnInit(): void {

   this.route.params
   .pipe(switchMap((params: Params) => this.dishService.getDish(params['id']) ))
   .subscribe((dish) => { this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id); },
       errmess => this.errMess = <any>errmess);

    this.dishService.getDishIds()
     .subscribe(dishIds => this.dishIds = dishIds);
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1 ) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1  ) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(){
    this.ratingForm= this.fb.group({
      author:['',[Validators.required,Validators.minLength(2)]],
      comment:['',[Validators.required,Validators.minLength(2)]],
      rating:5
    });

    this.ratingForm.valueChanges
      .subscribe(data => this.onValueChanged(data) );

    this.onValueChanged(); 

   }

   onValueChanged(data?: any){
    if(!this.ratingForm) {return ;}
    const form = this.ratingForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        // clear previous error message ( if any)
        this.formErrors[field] = "";
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key]+' ';
            }
          }
        }
      }
    }
  }

  onSubmit(){

    const com = this.ratingForm.value;
    com.date = new Date().toISOString();

    this.dishCopy.comments.push(com);
    this.dishService.putDish(this.dishCopy)
      .subscribe(dish => {
          this.dish = dish; this.dishCopy = dish;
      },
       errmess => { this.dish = null; this.dishCopy = null; this.errMess = <any>errmess; }) ;
    
    this.ratingFormDirective.resetForm();
    this.ratingForm.reset({
      author:'',
      comment: '',
      rating: 5,
    });

  }


}
