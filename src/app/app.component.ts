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
        this.filteredList = this.applyFilters({
          type: '',
          difficulties: [],
          tags: [],
        });
      });
  }

  handleSelectedCard(selectedQuestion: Question) {
    this.selectedCard = selectedQuestion;
    this.changeFormat = true;
    this.filteredList = this.questions.filter(
      (question) => question.id !== selectedQuestion.id
    );
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

  ngOnDestroy(): void {
    this.questionsSubscription.unsubscribe();
  }
}
