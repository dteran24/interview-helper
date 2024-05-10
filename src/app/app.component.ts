import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Question } from './models/question';
import { CardComponent } from './components/card/card.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  imports: [RouterOutlet, CardComponent, NgClass],
})
export class AppComponent {
  isSelected = false;
  selectedCard = {} as Question;
  questions = [
    new Question(1, 'What is the State Capital?', 'Austin', 'Geographic', 1),
    new Question(2, 'What is ABC?', 'Austin', 'Geographic', 1),
    new Question(3, 'Who let the dogs out?', 'Austin', 'Geographic', 1),
    new Question(4, 'What is the mitochondria?', 'Austin', 'Geographic', 1),
  ];
  filteredList: Question[] = this.questions;

  handleSelectedCard(selectedQuestion: Question) {
    this.selectedCard = selectedQuestion;
    this.isSelected = true;
    this.filteredList = this.questions.filter(
      (question) => question.id !== selectedQuestion.id
    );
  }
}
