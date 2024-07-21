import { Injectable } from '@angular/core';
import { Question, QuestionDTO } from '../models/question';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../const/constants';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {
  }
  private questionsSubject: BehaviorSubject<Question[]> = new BehaviorSubject<
    Question[]
  >([]);
  questions$: Observable<Question[]> = this.questionsSubject.asObservable();
  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  getQuestions(): Observable<Question[]> {
    this.loadingSubject.next(true);

    return this.http.get<Question[]>(`${API_URL}/questions/all`).pipe(
      tap((questions: Question[]) => {
        this.questionsSubject.next(questions);
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        this.loadingSubject.next(false);
        console.error('Failed to load initial questions', error);
        return throwError(() => new Error('Failed to load initial questions'));
      })
    );
  }
 
  addQuestion(questionDTO: QuestionDTO): Observable<Question> {
    const err = new Error('Failed to add question');
    return this.http.post<Question>(`${API_URL}/questions/add`, questionDTO)
      .pipe(
        tap((newQuestion: Question) => {
          const currentQuestions = this.questionsSubject.value;
          this.questionsSubject.next([...currentQuestions, newQuestion]);
        }),
        catchError(error => {
          console.error('Failed to add question', error);
          return throwError(()=> err);
        })
      );
  }
}
