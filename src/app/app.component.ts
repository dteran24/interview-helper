import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Question } from './models/question';
import { CardComponent } from './components/card/card.component';
import { NgClass } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { QuestionsService } from './services/questions.service';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { Subscription } from 'rxjs';
import { FilterCriteria } from './models/filter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

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
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
  ],
})
export class AppComponent implements OnInit {
  questions: Question[] = [];
  filteredList: Question[] = [];
  changeFormat = false;
  selectedCard?: Question;
  loading: boolean = false;

  private questionsSubscription!: Subscription;
  private loadingSubscription!: Subscription;

  constructor(private questionService: QuestionsService) {}
  ngOnInit(): void {
    // Trigger the initial fetch
    this.questionService.getQuestions().subscribe();

    // Fetch initial questions and subscribe to updates
    this.questionsSubscription = this.questionService.questions$.subscribe({
      next: (questions) => {
        this.questions = questions;
        this.filteredList = this.applyFilters({
          type: '',
          difficulties: [],
          tags: [],
        });
      },
      error: (error) => {
        console.error('Error fetching questions', error);
      },
    });

    // Optional: Subscribe to loading state
    this.loadingSubscription = this.questionService.loading$.subscribe(
      (isLoading) => {
        console.log('Loading state:', isLoading);
        this.loading = isLoading;
      }
    );

    
  }

  handleSelectedCard(selectedQuestion: Question) {
    this.selectedCard = selectedQuestion;
    this.changeFormat = true;
    // this.filteredList = this.questions.filter(
    //   (question) => question.id !== selectedQuestion.id
    // );
  }

  handleFilterChange(filters: FilterCriteria) {
    this.filteredList = this.applyFilters(filters);
  }
  applyFilters(filters: FilterCriteria): Question[] {
    return this.questions.filter((question) => {
      const matchesType = !filters.type || question.type === filters.type;
      const matchesDifficulty =
        !filters.difficulties.length ||
        filters.difficulties.includes(question.difficulty);
      const matchesTags =
        !filters.tags.length ||
        filters.tags.some((tag) => question.tags.includes(tag));
      return matchesType && matchesDifficulty && matchesTags;
    });
  }

  nextQuestion() {
    if (this.selectedCard) {
      this.selectedCard.selected = false;
      let index = this.questions.indexOf(this.selectedCard);
      if (index !== this.questions.length - 1) {
        this.selectedCard = this.questions[index + 1];
        this.handleSelectedCard(this.selectedCard);
      } else {
        this.selectedCard = this.questions[0];
        this.handleSelectedCard(this.selectedCard);
      }
    }
  }
  prevQuestion() {
    if (this.selectedCard) {
      this.selectedCard.selected = false;
      let index = this.questions.indexOf(this.selectedCard);
      if (index !== 0) {
        this.selectedCard = this.questions[index - 1];
        this.handleSelectedCard(this.selectedCard);
      } else {
        this.selectedCard = this.questions[this.questions.length - 1];
        this.handleSelectedCard(this.selectedCard);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.questionsSubscription) {
      this.questionsSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
