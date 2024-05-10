import { Component, Input } from '@angular/core';
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
  @Input() isSelected!: boolean
  @Input() question: Question = {} as Question;
}
