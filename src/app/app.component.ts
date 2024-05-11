import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Question } from './models/question';
import { CardComponent } from './components/card/card.component';
import { NgClass } from '@angular/common';
import { FilterComponent } from "./components/filter/filter.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [RouterOutlet, CardComponent, NgClass, FilterComponent]
})
export class AppComponent {
  changeFormat = false;
  selectedCard = {} as Question;
  questions = [
    new Question(
      1,
      'What is the State Capital?',
      'Austin',
      'Geographic',
      1,
      false
    ),
    new Question(2, 'What is ABC?', 'Letters', 'Geographic', 1, false),
    new Question(3, 'Who let the dogs out?', 'I did', 'Geographic', 1, false),
    new Question(
      4,
      'What is the mitochondria?',
      'PowerHouse',
      'Geographic',
      1,
      false
    ),
  ];
  filteredList: Question[] = this.questions;

  handleSelectedCard(selectedQuestion: Question) {
    this.selectedCard = selectedQuestion;
    this.changeFormat = true;
    this.filteredList = this.questions.filter(
      (question) => question.id !== selectedQuestion.id
    );
  }
}
