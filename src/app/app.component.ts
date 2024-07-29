import { Component, OnInit, output } from '@angular/core';
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
import { MatMenuModule } from '@angular/material/menu';
import { SettingsService } from './services/settings.service';

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
    MatMenuModule,
    HttpClientModule,
  ],
})
export class AppComponent implements OnInit {
  questions: Question[] = [];
  filteredList: Question[] = [];
  changeFormat = false;
  selectedCard?: Question;
  loading: boolean = false;
  editMode: boolean = false;
  hideList: boolean = false;

  private questionsSubscription!: Subscription;
  private loadingSubscription!: Subscription;

  constructor(
    private questionService: QuestionsService,
    private settingsService: SettingsService
  ) {}
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
        // const hideListLocalStorage = this.settingsService.getItem('hideList');
        // if (hideListLocalStorage !== null) {
        //   this.hideList = JSON.parse(hideListLocalStorage);
        // }
      },
      error: (error) => {
        console.error('Error fetching questions', error);
      },
    });

    // Optional: Subscribe to loading state
    this.loadingSubscription = this.questionService.loading$.subscribe(
      (isLoading) => {
        this.loading = isLoading;
      }
    );
  }
  //if card is selected change format, show question
  handleSelectedCard(selectedQuestion: Question) {
    this.selectedCard = selectedQuestion;
    this.selectedCard.selected = false;
    this.changeFormat = true;
  }
  //if deleted card is selectedQuestion then next question is selected
  handleCardDeleted(deletedQuestion: Question) {
    if (this.filteredList.length === 0) {
      this.selectedCard = undefined;
      this.changeFormat = false;
    }
    if (deletedQuestion.id === this.selectedCard?.id) {
      this.nextQuestion();
    }
    this.editMode = false;
  }
  //if updated card is selectedQuestion make updated card selectedQuestion
  handleEditMode(updatedQuestion: Question) {
    if (updatedQuestion && updatedQuestion.id === this.selectedCard?.id) {
      this.selectedCard = updatedQuestion;
      this.editMode = false;
    }
  }
  //if form is opened remove edit mode
  handleOpenForm(isShown: boolean) {
    if (isShown) {
      this.editMode = false;
    }
  }
  //when filters are added reset selectedQuestin and change format
  handleFilterChange(filters: FilterCriteria) {
    this.filteredList = this.applyFilters(filters);
    this.selectedCard = undefined;
    this.hideListOff();
    this.changeFormat = false;
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
      } else {
        this.selectedCard = this.questions[0];
      }
      this.handleSelectedCard(this.selectedCard);
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
  turnOnEdit() {
    this.editMode = true;
  }
  turnOffEdit() {
    this.editMode = false;
  }
  hideListOn() {
    this.hideList = true;
    // this.settingsService.setItem('hideList', JSON.stringify(this.hideList));
  }
  hideListOff() {
    this.hideList = false;
    // this.settingsService.setItem('hideList', JSON.stringify(this.hideList));
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
