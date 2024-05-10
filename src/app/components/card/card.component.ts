import { Component, Input } from '@angular/core';
import { Question } from '../../models/question';

@Component({
  selector: 'question-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass'
})
export class CardComponent {
  @Input() question: Question = {} as Question;
}
