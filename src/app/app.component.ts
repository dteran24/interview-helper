import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Question } from './models/question';
import { CardComponent } from './components/card/card.component';
import { NgClass } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { QuestionsService } from './services/questions.service';
import { AddQuestionComponent } from "./components/add-question/add-question.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [RouterOutlet, CardComponent, NgClass, FilterComponent, AddQuestionComponent]
})
export class AppComponent implements OnInit {
  questions: Question[] = [];

  filteredList: Question[] = [];

  constructor(private questionService: QuestionsService) {}
  ngOnInit(): void {
    this.questions = this.questionService.getQuestions();
    this.filteredList = [...this.questions];
    console.log(this.questions);
  }

  changeFormat = false;
  selectedCard?: Question;

  handleSelectedCard(selectedQuestion: Question) {
    this.selectedCard = selectedQuestion;
    this.changeFormat = true;
    this.filteredList = this.questions.filter(
      (question) => question.id !== selectedQuestion.id
    );
  }
}
