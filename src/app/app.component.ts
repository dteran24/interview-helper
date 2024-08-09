import {
  Component,
  ElementRef,
  OnInit,
  output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Question } from './models/question';
import { CardComponent } from './components/card/card.component';
import { NgClass } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { QuestionsService } from './services/questions.service';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { Subscription } from 'rxjs';
import { FilterCriteria } from './models/filter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  imports: [
    RouterOutlet,
    CardComponent,
    NgClass,
    FilterComponent,
    AddQuestionComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
  ],
})
export class AppComponent implements OnInit {
  questions: Question[] = [];
  filteredList: Question[] = [];
  changeFormat = false;
  selectedCard?: Question;
  loading: boolean = false;
  editMode: boolean = false;
  hideList: boolean = false;
  displayArrows = { down: false, up: false };

  @ViewChild('questionContainer') scroll!: ElementRef;

  private questionsSubscription!: Subscription;
  private loadingSubscription!: Subscription;
  private scrollListenerAdded: boolean = false;
  private keydownListener: any;

  constructor(
    private questionService: QuestionsService,
    private renderer: Renderer2 // private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    // Trigger the initial fetch
    this.questionService.getQuestions().subscribe();

    // Fetch initial questions and subscribe to updates
    this.questionsSubscription = this.questionService.questions$.subscribe({
      next: (questions) => {
        this.questions = questions;
        this.filteredList = this.applyFilters({
          type: '',
          difficulties: [],
          tags: [],
        });

        this.setDisplayArrows();
        // const hideListLocalStorage = this.settingsService.getItem('hideList');
        // if (hideListLocalStorage !== null) {
        //   this.hideList = JSON.parse(hideListLocalStorage);
        // }
      },
      error: (error) => {
        console.error('Error fetching questions', error);
      },
    });

    // Add keydown event listener
    this.keydownListener = this.renderer.listen(
      'document',
      'keydown',
      (event) => {
        this.handleKeydown(event);
      }
    );

    // Optional: Subscribe to loading state
    this.loadingSubscription = this.questionService.loading$.subscribe(
      (isLoading) => {
        this.loading = isLoading;
      }
    );
  }
  //add scrolllistener when list is shown
  ngAfterViewChecked(): void {
    if (this.changeFormat && !this.scrollListenerAdded) {
      this.addScrollListener();
    }
  }
  //remove subscription and key listener
  ngOnDestroy(): void {
    if (this.questionsSubscription) {
      this.questionsSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (this.keydownListener) {
      this.keydownListener();
    }
  }

  //function to add scrolllistener if not already added
  addScrollListener(): void {
    if (this.scroll && !this.scrollListenerAdded) {
      this.scroll.nativeElement.addEventListener(
        'scroll',
        this.onScroll.bind(this)
      );
      this.scrollListenerAdded = true;
    }
  }
  //removes scroll listener
  removeScrollListener(): void {
    if (this.scroll && this.scrollListenerAdded) {
      this.scroll.nativeElement.removeEventListener(
        'scroll',
        this.onScroll.bind(this)
      );
      this.scrollListenerAdded = false;
    }
  }
  // on scroll display arrow depending scroll height
  onScroll(): void {
    const element = this.scroll.nativeElement;
    const atTop = element.scrollTop === 0;
    const atBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;

    if (atTop && !this.hideList) {
      this.displayArrows.down = true;
      this.displayArrows.up = false;
    }
    if (atBottom && !this.hideList) {
      this.displayArrows.up = true;
      this.displayArrows.down = false;
    }
  }

  //if card is selected change format, show question
  handleSelectedCard(selectedQuestion: Question) {
    this.selectedCard = selectedQuestion;
    this.selectedCard.selected = false;
    this.changeFormat = true;
    this.setDisplayArrows();
  }
  //if deleted card is selectedQuestion then next question is selected
  handleCardDeleted(deletedQuestion: Question) {
    if (this.filteredList.length === 0) {
      this.selectedCard = undefined;
      this.changeFormat = false;
      this.hideArrows();
    }
    if (deletedQuestion.id === this.selectedCard?.id) {
      this.nextQuestion();
    }
    this.editMode = false;
  }
  //if updated card is selectedQuestion make updated card selectedQuestion
  handleEditMode(updatedQuestion: Question) {
    if (updatedQuestion && updatedQuestion.id === this.selectedCard?.id) {
      this.selectedCard = updatedQuestion;
      this.editMode = false;
    }
  }
  //if form is opened remove edit mode
  handleOpenForm(isShown: boolean) {
    if (isShown) {
      this.editMode = false;
    }
  }
  //when filters are added reset selectedQuestin and change format
  handleFilterChange(filters: FilterCriteria) {
    this.filteredList = this.applyFilters(filters);
    this.selectedCard = undefined;
    this.hideListOff();
    this.changeFormat = false;
    this.hideArrows();
  }
  // apply filters
  applyFilters(filters: FilterCriteria): Question[] {
    return this.questions.filter((question) => {
      const matchesType = !filters.type || question.type === filters.type;
      const matchesDifficulty =
        !filters.difficulties.length ||
        filters.difficulties.includes(question.difficulty);
      const matchesTags =
        !filters.tags.length ||
        filters.tags.some((tag) => question.tags.includes(tag));
      return matchesType && matchesDifficulty && matchesTags;
    });
  }
  //next card if at the end of array go to first
  nextQuestion() {
    if (this.selectedCard) {
      this.selectedCard.selected = false;
      let index = this.questions.indexOf(this.selectedCard);
      if (index !== this.questions.length - 1) {
        this.selectedCard = this.questions[index + 1];
      } else {
        this.selectedCard = this.questions[0];
      }
      this.handleSelectedCard(this.selectedCard);
    }
  }
  //prev card if first go to last
  prevQuestion() {
    if (this.selectedCard) {
      this.selectedCard.selected = false;
      let index = this.questions.indexOf(this.selectedCard);
      if (index !== 0) {
        this.selectedCard = this.questions[index - 1];
        this.handleSelectedCard(this.selectedCard);
      } else {
        this.selectedCard = this.questions[this.questions.length - 1];
        this.handleSelectedCard(this.selectedCard);
      }
    }
  }
  //add keyboard support
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.prevQuestion();
    } else if (event.key === 'ArrowRight') {
      this.nextQuestion();
    } else if (event.key === ' ') {
      this.toggleSelected();
    }
  }
  //toggle answer on selected card
  toggleSelected() {
    if (this.selectedCard) {
      console.log(this.selectedCard);
      this.selectedCard.selected = !this.selectedCard.selected;
    }
  }
  //arrow click shortcut
  scrollTop() {
    this.scroll.nativeElement.scrollTop = 0;
    this.displayArrows.down = true;
    this.displayArrows.up = false;
  }
  //arrow click shortcut
  scrollBottom() {
    this.scroll.nativeElement.scrollTop =
      this.scroll.nativeElement.scrollHeight;
    this.displayArrows.down = false;
    this.displayArrows.up = true;
  }
  //hide nav arrows under list
  hideArrows() {
    type ArrowKey = 'down' | 'up';
    Object.keys(this.displayArrows).forEach((key) => {
      this.displayArrows[key as ArrowKey] = false;
    });
  }
  //display arrows depending on length and format
  setDisplayArrows() {
    if (this.filteredList.length > 4 && this.changeFormat) {
      this.displayArrows.down = true;
    } else {
      this.displayArrows.down = false;
    }
  }
  turnOnEdit() {
    this.editMode = true;
  }
  turnOffEdit() {
    this.editMode = false;
  }

  hideListOn() {
    this.hideList = true;
    this.hideArrows();
    this.removeScrollListener();
    // this.settingsService.setItem('hideList', JSON.stringify(this.hideList));
  }
  hideListOff() {
    this.hideList = false;
    this.addScrollListener();
    this.displayArrows.down = true;
    // this.settingsService.setItem('hideList', JSON.stringify(this.hideList));
  }
}
