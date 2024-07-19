import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Question } from '../../models/question';
import { NgClass } from '@angular/common';

@Component({
  selector: 'question-card',
  standalone: true,
  imports: [NgClass, MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  @Input() changeFormat!: boolean;
  @Input() question?: Question;
  @Input() selectedQuestion?: Question;

  @Output() selectedCardData = new EventEmitter<Question>();

  selectItem() {
    this.selectedCardData.emit(this.question);
    this.resetShowAnswer();
  }
  show() {
    if (this.selectedQuestion) {
      this.selectedQuestion.setSelected(!this.selectedQuestion.isSelected()) 
    }
  }
  resetShowAnswer() {
    if (this.question) {
      this.question.setSelected(false)
    }
  }
}
