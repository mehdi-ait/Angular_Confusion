import { delay } from 'rxjs/operators';
import { FeedbackService } from './../services/feedback.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,FormGroup, NgForm, Validators} from '@angular/forms';
import { flyInOut,expand } from '../animations/app.animation';

import { Feedback, ContactType } from './../shared/feedback';




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]' : 'true',
    'style' : 'display: block;'
  },
  animations : [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackErrMess:string;
  contactType= ContactType;
  @ViewChild('fform') feedbackFormDirective:NgForm;
  show = true;
  hide=true;


  formErrors = {
    'firstname' : '',
    'lastname' : '',
    'telnum' : '',
    'email' : ''
  };

  validationMessages = {
    'firstname' : {
      'required' : 'First name is required',
      'minlength' : 'First name must be at least 2 characters long',
      'maxlength' : 'First name cannot be more than 25 characters'
    },
    'lastname' : {
      'required' : 'Last name is required',
      'minlength' : 'Last name must be at least 2 characters long',
      'maxlength' : 'Last name cannot be more than 25 characters'
    },
    'telnum' : {
      'required' : 'Tel num is required',
      'pattern' : ' Tel num must contain only numbers'
    },
    'email' : {
      'required' : 'Email is required',
      'email' : ' Email not in valid format'
    }
  };

  constructor(private fb: FormBuilder,
        private feedbackService: FeedbackService) { 
    this.createForm();
  }

  ngOnInit(): void {
   
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname:['',[Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
      lastname:['',[Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
      telnum:[0,[Validators.required, Validators.pattern]],
      email:['',[Validators.required, Validators.email]],
      agree:false,
      contacttype:'None',
      message:''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data) );

    this.onValueChanged(); //(re)set form validation messages
  }

  onValueChanged(data?: any){
    if(!this.feedbackForm) {return ;}
    const form = this.feedbackForm;
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

    this.hide=false;

    this.feedbackService.submitFeedback(this.feedbackForm.value)
      .subscribe( feedback => { 
        this.feedback = feedback;
        setTimeout(()=>{ this.hide=true; }, 5000);
        },
        errmess => { this.feedback = null; this.feedbackErrMess = <any>errmess; });

    this.feedbackForm.reset({
      firstname:'',
      lastname: '',
      telnum: 0,
      email:'',
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackFormDirective.resetForm();

  }



}
