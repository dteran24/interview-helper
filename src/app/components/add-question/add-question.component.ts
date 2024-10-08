import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QuestionDTO } from '../../models/question';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

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
    MatButtonToggleModule,
    TextFieldModule,
  ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.sass',
  animations: [
    trigger('formAnimation', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
        })
      ),
      state(
        '*',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      transition('void => *', [animate('300ms ease-in-out')]),
      transition('* => void', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class AddQuestionComponent {
  @ViewChild('addQuestionForm') addQuestionForm: ElementRef | undefined;
  question = new FormControl('', Validators.required);
  answer = new FormControl('', Validators.required);
  type = '';
  tags: string[] = [];
  difficulty = '';
  errorMessage = '';
  tagList = ['Java', 'JavaScript', 'React', 'Spring Boot', 'Angular'];
  difficultyList = ['Easy', 'Medium', 'Hard'];
  @Output() isShown = new EventEmitter<boolean>();
  displayForm = false;

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
    if (this.question.value && this.answer.value) {
      // Create a QuestionDTO object
      let userQuestion: QuestionDTO = {
        question: this.question.value,
        answer: this.answer.value,
        type: this.type,
        tags: this.tags,
        difficulty: this.difficulty,
        selected: false,
      };
      // Call the service to add the question
      this.questionsService.addQuestion(userQuestion).subscribe({
        next: () => {
          // Reset the form fields after successful submission
          this.resetForm();
          this.displayForm = false;
          this.emitIsShown();
        },
        error: (error) => {
          console.error('Could not add question to database', error);
        },
      });
    }
  }
  emitIsShown() {
    this.isShown.emit(this.displayForm);
  }
  displayFormHandler() {
    this.displayForm = true;
    this.emitIsShown();
    setTimeout(() => {
      if (this.addQuestionForm) {
        this.addQuestionForm.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 0);
  }
  onCancel(event: Event) {
    event.preventDefault();
    this.resetForm();
    this.displayForm = false;
    this.emitIsShown();
  }

  onTagChange(event: any, tag: string) {
    if (event.checked) {
      this.tags.push(tag.toLowerCase());
    } else {
      const index = this.tags.indexOf(tag);
      if (index > -1) {
        this.tags.splice(index, 1);
      }
    }
  }

  resetForm() {
    this.question.reset();
    this.answer.reset();
    this.type = '';
    this.tags = [];
    this.difficulty = '';
    this.errorMessage = '';
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
