import { catchError, delay } from 'rxjs/operators';
import { baseURL } from './../shared/baseurl';
import { Feedback } from './../shared/feedback';
import { Observable } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
      private processHTTPMsgService:ProcessHTTPMsgService) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
     };

    return this.http.post<Feedback>(baseURL+"feedback",feedback,httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));

  }



}
