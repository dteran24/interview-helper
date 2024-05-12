import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';


@Component({
  selector: 'filter',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, MatCheckboxModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.sass',
})
export class FilterComponent {
  types = ['Technical', 'Behavioral', 'All'];
  tags = ['Java', 'JavaScript', 'React', 'Spring Boot', 'Angular'];
  difficulty = [1, 2, 3, 4, 5];
  type = 'All';
  isOpen = false;

  toggleFilter() {
    this.isOpen = !this.isOpen;
  }
  changeType(type: string) {
    this.type = type;
  }

}
