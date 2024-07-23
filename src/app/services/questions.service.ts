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
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API_URL } from '../const/constants';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}
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
      tap({
        next: (questions: Question[]) => {
          this.questionsSubject.next(questions);
          this.loadingSubject.next(false);
        },
        error: (error) => {
          this.loadingSubject.next(false);
          console.error('Failed to load initial questions', error);
          return throwError(
            () => new Error('Failed to load initial questions')
          );
        },
      })
    );
  }

  addQuestion(questionDTO: QuestionDTO): Observable<Question> {
    const err = new Error('Failed to add question');
    return this.http
      .post<Question>(`${API_URL}/questions/add`, questionDTO)
      .pipe(
        tap({
          next: (newQuestion: Question) => {
            const currentQuestions = this.questionsSubject.value;
            this.questionsSubject.next([...currentQuestions, newQuestion]);
          },
          error: (error) => {
            console.error('Failed to add question', error);
            return throwError(() => err);
          },
        })
      );
  }

  removeQuestion(id: number): Observable<string> {
    return this.http
      .delete<string>(`${API_URL}/questions/delete/${id}`, {
        responseType: 'text' as 'json',
      })
      .pipe(
        tap({
          next: () => {
            const currentQuestions = this.questionsSubject.value;
            const updatedQuestions = currentQuestions.filter(
              (question) => question.id !== id
            );
            this.questionsSubject.next(updatedQuestions);
          },
          error: (error) => {
            console.error('Failed to remove question', error);
            return throwError(() => new Error('Failed to remove question'));
          },
        })
      );
  }
}
