import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionsService } from '../../services/questions.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {
  FormBuilder,
  FormControl,
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
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
    MatButtonToggleModule
  ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.sass',
})
export class AddQuestionComponent {
  displayForm = false;
  question = new FormControl('', Validators.required);
  answer = new FormControl('', Validators.required);
  type = '';
  tags = [];
  difficulty = '';
  errorMessage = '';
  tagList = ['Java', 'JavaScript', 'React', 'Spring Boot', 'Angular'];
  difficultyList = ['Easy', 'Medium', 'Hard'];

  constructor(private questionsService: QuestionsService) {
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
    if ((this.question.value, this.answer.value, this.type)) {
      let userQuestion = new Question(
        4,
        this.question.value!,
        this.answer.value!,
        this.type,
        ['React'],
        3,
        false
      );
      this.questionsService.addQuestion(userQuestion);
      this.question.reset('');
      this.answer.reset('');
      this.type = '';
      this.displayForm = false;
    }
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
