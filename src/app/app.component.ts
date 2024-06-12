import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Question } from './models/question';
import { CardComponent } from './components/card/card.component';
import { NgClass } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { QuestionsService } from './services/questions.service';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  imports: [
    RouterOutlet,
    CardComponent,
    NgClass,
    FilterComponent,
    AddQuestionComponent,
  ],
})
export class AppComponent implements OnInit {
  questions: Question[] = [];
  filteredList: Question[] = [];
  changeFormat = false;
  selectedCard?: Question;

  private questionsSubscription!: Subscription;

  constructor(private questionService: QuestionsService) {}
  ngOnInit(): void {
    this.questions = this.questionService.getQuestions();
    this.filteredList = [...this.questions];

    this.questionsSubscription = this.questionService
      .getQuestionsObservable()
      .subscribe((questions) => {
        this.questions = questions;
        this.filteredList = [...this.questions];
      });

    console.log(this.questions);
  }

  handleSelectedCard(selectedQuestion: Question) {
    this.selectedCard = selectedQuestion;
    this.changeFormat = true;
    this.filteredList = this.questions.filter(
      (question) => question.id !== selectedQuestion.id
    );
  }
  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.questionsSubscription.unsubscribe();
  }
}
