import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Question } from '../../models/question';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'question-card',
  standalone: true,
  imports: [NgClass, MatCardModule, MatIconModule,MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  @Input() changeFormat!: boolean;
  @Input() question?: Question;
  @Input() selectedQuestion?: Question;
  @Input() deleteMode?: boolean = false;

  @Output() selectedCardData = new EventEmitter<Question>();
  constructor(private questionService: QuestionsService) {
  }


  selectItem() {
    this.selectedCardData.emit(this.question);
    this.resetShowAnswer();
  }
  show() {
    if (this.selectedQuestion) {
      this.selectedQuestion.selected = !this.selectedQuestion.selected;
    }
  }
  resetShowAnswer() {
    if (this.question) {
      this.question.selected = false;
    }
  }
  deleteCard(): void {
    if (this.question) {
      this.questionService.removeQuestion(this.question.id).subscribe({
        next: () => {
          console.log('Question deleted successfully');
          this.deleteMode = false;
        },
        error: (error) => {
          console.error('Failed to delete question', error);
        },
      });
    }
  }
}
