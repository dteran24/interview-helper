import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Question } from './models/question';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  questions = [
    new Question(1, "What is the State Capital?", "Austin", "Geographic", 1),
    new Question(1, "What is the State Capital?", "Austin", "Geographic", 1),
    new Question(1, "What is the State Capital?", "Austin", "Geographic", 1),
    new Question(1, "What is the State Capital?", "Austin", "Geographic", 1),
  ];
}
