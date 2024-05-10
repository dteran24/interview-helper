import { Component, EventEmitter, Input, Output, output } from '@angular/core';
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
  @Output() isSelectedData = new EventEmitter<boolean>();
  @Output() selectedCardData = new EventEmitter<Question>();

  selectItem() {
    this.selectedCardData.emit(this.question);
  }

  }

