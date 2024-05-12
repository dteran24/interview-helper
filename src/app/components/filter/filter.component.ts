import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'filter',
  standalone: true,
  imports: [FontAwesomeModule, MatIconModule,MatButtonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.sass',
})
export class FilterComponent {
  filterIcon = faSliders;
  isOpen = false;
  types = ['Technical', 'Behavioral'];
  tags = ['Java', 'JavaScript', 'React', 'Spring Boot', 'Angular'];
  difficulty = [1, 2, 3, 4, 5];
  showFilters = false;
  toggleFilter() {
    this.isOpen = !this.isOpen;
  }
}
