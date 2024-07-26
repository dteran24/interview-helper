import { Component, EventEmitter, inject, input, Input, Output, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Question } from '../../models/question';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { QuestionsService } from '../../services/questions.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'question-card',
  standalone: true,
  imports: [NgClass, MatCardModule, MatIconModule,MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  //recieve data from parent componenet
  @Input() changeFormat!: boolean;
  @Input() question?: Question;
  @Input() selectedQuestion?: Question;
  @Input() editMode?: boolean = false;
  @Input() nextSelected?: boolean = false;
  //send data to pare component
  @Output() selectedCardData = new EventEmitter<Question>();
  @Output() cardDeleted = new EventEmitter<Question>();
  readonly dialog = inject(MatDialog);
  constructor(private questionService: QuestionsService) {}

  openDialog(question: Question): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        id: question.id,
        question: question.question,
        answer: question.answer,
        type: question.type,
        tags: question.tags,
        difficulty: question.difficulty,
        selected: question.selected,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
      }
    });
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
  //call service to delete card and notfiy parent component
  deleteCard(event: Event): void {
    event.stopPropagation();
    if (this.question) {
      this.questionService.removeQuestion(this.question.id).subscribe({
        next: () => {
          this.cardDeleted.emit(this.question);
        },
        error: (error) => {
          console.error('Failed to delete question', error);
        },
      });
    }
  }
}
