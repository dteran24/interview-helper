import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'filter',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, MatCheckboxModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.sass',
})
export class FilterComponent {
  typeList = ['Technical', 'Behavioral'];
  tagList = ['Java', 'JavaScript', 'React', 'Spring Boot', 'Angular'];
  difficultyList = ['Easy', 'Medium', 'Hard'];
  sortList = ['Alphabetically','Date Posted']
  type = '';
  difficulty = '';
  sortType = '';
  isOpen = false;

  toggleFilter() {
    this.isOpen = !this.isOpen;
  }

  changeDifficulty(difficulty: string) {
    this.difficulty = difficulty;
  }

  changeType(type: string) {
    this.type = type;
  }
}
