import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { Question } from '../../models/question';
import { NgClass } from '@angular/common';

@Component({
  selector: 'question-card',
  standalone: true,
  imports: [NgClass],
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
      this.selectedQuestion.selected = !this.selectedQuestion.selected
    }
  }
  resetShowAnswer() {
    if (this.question) {
      this.question.selected = false;
    }
  }
}
