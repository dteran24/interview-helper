import { Component, Inject, NgZone } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Question } from '../../models/question';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { QuestionsService } from '../../services/questions.service';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.sass',
})
export class ModalComponent {
  editForm: FormGroup;
  didUpdate = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Question,
    private dialogRef: MatDialogRef<ModalComponent>,
    private questionService: QuestionsService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      question: [data.question],
      answer: [data.answer],
    });
  }
  //grab data from form and add to existing data
  editQuestion() {
    const updatedQuestion: Question = {
      ...this.data,
      question: this.editForm.value.question,
      answer: this.editForm.value.answer,
    };
    if (updatedQuestion !== this.data) {
      this.questionService.editQuestion(updatedQuestion).subscribe({
        next: () => {
          this.didUpdate = true;
          this.dialogRef.close({
            success: this.didUpdate,
            question: updatedQuestion,
          });
        },
        error: (error) => {
          console.error('could not update', error);
          this.didUpdate = false;
          this.dialogRef.close({ success: this.didUpdate });
        },
      });
    } else {
      this.onNoClick();
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ success: this.didUpdate });
  }
}
