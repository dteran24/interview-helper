import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterCriteria } from '../../models/filter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'filter',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    CommonModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.sass',
})
export class FilterComponent {
  @Output() filterChanged = new EventEmitter<FilterCriteria>();

  typeList = ['Technical', 'Behavioral'];
  tagList = ['Java', 'JavaScript', 'React', 'Spring Boot', 'Angular'];
  difficultyList = ['Easy', 'Medium', 'Hard'];
  sortList = ['Date Posted'];
  filterCriteria: FilterCriteria = {
    type: '',
    difficulties: [],
    tags: [],
  };
  titleMap: { [key: string]: string } = {
    type: 'Type',
    difficulties: 'Difficulty',
    tags: 'Tags',
  };
  isOpen = false;

  toggleFilter() {
    this.isOpen = !this.isOpen;
  }

  changeDifficulty(event: any, difficulty: string) {
    difficulty = difficulty.toLocaleLowerCase();
    if (event.checked) {
      this.filterCriteria.difficulties.push(difficulty);
    } else {
      const index = this.filterCriteria.difficulties.indexOf(difficulty);
      if (index > -1) {
        this.filterCriteria.difficulties.splice(index, 1);
      }
    }
    this.emitFilterChange();
  }

  selectType(type: string) {
    this.filterCriteria.type = type.toLocaleLowerCase();
    this.emitFilterChange();
  }

  changeTag(event: any, tag: string) {
    if (event.checked) {
      this.filterCriteria.tags.push(tag);
    } else {
      const index = this.filterCriteria.tags.indexOf(tag);
      if (index > -1) {
        this.filterCriteria.tags.splice(index, 1);
      }
    }
    this.emitFilterChange();
  }

  emitFilterChange() {
    this.filterChanged.emit(this.filterCriteria);
  }
  objectKeys(obj: any) {
    return Object.keys(obj);
  }
  getObjectValueByKey(obj: any, key: string) {
    return obj[key];
  }

  isAnyFilterActive(): boolean {
    return (
      this.filterCriteria.type !== '' ||
      this.filterCriteria.difficulties.length > 0 ||
      this.filterCriteria.tags.length > 0
    );
  }
  removeFilter(key: string) {
    if (key === 'type') {
      this.filterCriteria.type = '';
    }
    if (key === 'difficulties') {
      this.filterCriteria.difficulties = [];
    } else {
      this.filterCriteria.tags = [];
    }
    this.emitFilterChange();
  }
}
