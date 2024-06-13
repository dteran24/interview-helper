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
  sortList = ['Date Posted'];
  type:string  = "";
  difficulties: string[] = [];
  tags: string[] = [];
  isOpen = false;
  constructor() {}

  toggleFilter() {
    this.isOpen = !this.isOpen;
  }

  changeDifficulty(event: any, difficulty: string) {
    if (event.checked) {
      this.difficulties.push(difficulty);
    } else {
      const index = this.difficulties.indexOf(difficulty);
      if (index > -1) {
        this.difficulties.splice(index, 1);
      }
    }
    console.log(this.difficulties)
  }

  selectType(type: string) {
    this.type = type.toLocaleLowerCase();
    console.log(this.type)
  }

  changeTag(event: any, tag: string) {
    if (event.checked) {
      this.tags.push(tag);
    } else {
      const index = this.tags.indexOf(tag);
      if (index > -1) {
        this.tags.splice(index, 1);
      }
    }
    console.log(this.tags)
  }
  
}
