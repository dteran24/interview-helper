import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { QuestionsService } from '../../services/questions.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Question } from '../../models/question';
@Component({
  selector: 'add-question',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.sass',
})
export class AddQuestionComponent {
  displayForm = false;
  question = new FormControl('', Validators.required);
  answer = new FormControl('', Validators.required);
  errorMessage = '';
  constructor(
    private questionsService: QuestionsService,
    private fb: FormBuilder
  ) {
    merge(
      this.question.statusChanges,
      this.question.valueChanges,
      this.answer.statusChanges,
      this.answer.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  onsubmit() {
    let userQuestion = new Question(
      4,
      this.question.value!,
      this.answer.value!,
      'Technical',
      ['React'],
      3,
      false
    );
    this.questionsService.addQuestion(userQuestion);
    this.question.reset('');
    this.answer.reset('');
    this.displayForm = false;
  }
  displayFormHandler() {
    this.displayForm = true;
  }
  onCancel() {
    this.displayForm = false;
  }

  updateErrorMessage() {
    if (this.question.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    }
    // else if (this.question.hasError('email')) {
    //   this.errorMessage = 'Not a valid email';
    // }
    else {
      this.errorMessage = '';
    }
  }
}
