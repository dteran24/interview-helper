import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { QuestionsService } from '../../services/questions.service';

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
  ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.sass',
})
export class AddQuestionComponent {
  displayForm = false;
  constructor(private questionsService: QuestionsService) { }
  onsubmit() {}
  onCancel(){}
}
