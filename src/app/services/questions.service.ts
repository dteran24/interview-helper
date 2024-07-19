import { Injectable } from '@angular/core';
import { Question, QuestionDTO } from '../models/question';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../const/constants';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}
  private questionsSubject: Subject<Question[]> = new Subject<Question[]>();
  questions: Question[] = [];

  
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${API_URL}/questions/all`).pipe(
      tap((questions: Question[]) => {
        this.questions = questions;
        this.questionsSubject.next(this.questions);
      })
    );
  }
  addQuestion(questionDTO: QuestionDTO): Observable<Question> {
    return this.http.post<Question>(`${API_URL}/questions/add`, questionDTO).pipe(
      tap((newQuestion: Question) => {
        this.questions.push(newQuestion);
        this.questionsSubject.next(this.questions);
        console.log(this.questions);
      })
    );
  }

  sortByDate() {}
}
