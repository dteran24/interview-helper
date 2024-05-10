import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Question } from './models/question';
import { CardComponent } from "./components/card/card.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [RouterOutlet, CardComponent]
})
export class AppComponent {
  questions = [
    new Question(1, "What is the State Capital?", "Austin", "Geographic", 1),
    new Question(1, "What is the State Capital?", "Austin", "Geographic", 1),
    new Question(1, "What is the State Capital?", "Austin", "Geographic", 1),
    new Question(1, "What is the State Capital?", "Austin", "Geographic", 1),
  ];
}
