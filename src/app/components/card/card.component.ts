import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Question } from '../../models/question';
import { NgClass, NgStyle } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { QuestionsService } from '../../services/questions.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import {
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'question-card',
  standalone: true,
  imports: [NgClass, MatCardModule, MatIconModule, MatButtonModule,NgStyle],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
  animations: [
    trigger('swipeOut', [
      transition('* => void', [
        animate(
          '1s ease-in',
          style({ opacity: 0, transform: 'translateX(100%)' })
        ),
      ]),
    ]),
  ],
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
  @Output() cardUpdated = new EventEmitter<Question>();

  isDeleting: boolean = false;

  constructor(
    private questionService: QuestionsService,
    private dialog: MatDialog
  ) {}
  //open dialog with existing data
  openDialog(question: Question): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: question,
    });
    //notify parent component if update complete
    dialogRef.afterClosed().subscribe((result) => {
      if (result.success) {
        this.cardUpdated.emit(result.question);
      }
    });
  }
  //if card is selected it is main
  selectItem() {
    this.selectedCardData.emit(this.question);
    this.resetShowAnswer();
  }
  //toggle display answer or question
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
    this.isDeleting = true;
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

  // Determines font size based on the content length
  getFontSize(content: string): string {
    if (!content) return '16px'; // Default font size
    const length = content.length;
    if (length < 50) return '24px'; // Large font size for short text
    if (length < 100) return '16px'; // Medium font size for moderate text
    return '14px'; // Small font size for long text
  }
}
