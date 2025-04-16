import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../models/question.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/questions`;

  getRandomQuestions(count: number = 5): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/random?count=${count}`);
  }

  getQuizQuestions(): Observable<Question[]> {
    const numberOfQuestions = 5;
    return this.getRandomQuestions(numberOfQuestions);
  }
}
