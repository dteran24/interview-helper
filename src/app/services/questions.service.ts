import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private questionsSubject: Subject<Question[]> = new Subject<Question[]>();
  questions: Question[] = [
    new Question(
      1,
      'What is the state capital of Texas?',
      'Austin',
      'technical',
      ['geographic'],
      "easy",
      false
    ),
    new Question(
      2,
      'Explain the concept of state in React.',
      'In React, state is a built-in object that represents the data or information about the component. It can be changed over time and is managed internally by React. State allows React components to manage their data and respond to user actions.',
      'technical',
      ['React'],
      "medium",
      false
    ),
    new Question(
      3,
      'What is dependency injection in Spring Boot?',
      'Dependency injection is a design pattern used in Spring Boot to allow objects to receive their dependencies from an external source rather than creating them themselves. It helps in achieving loose coupling and improves the testability and maintainability of the code.',
      'technical',
      ['Spring Boot'],
      "easy",
      false
    ),
    new Question(
      4,
      'What is polymorphism in Java?',
      'Polymorphism in Java allows objects to be treated as instances of their parent class or any of its subclasses. It enables a single interface to represent multiple types or classes, allowing for code reuse and flexibility.',
      'technical',
      ['Java'],
      "easy",
      false
    ),
    new Question(
      5,
      'What is a closure in JavaScript?',
      'A closure in JavaScript is a function that has access to its own scope, as well as the scope in which it was defined. This allows the function to access variables and parameters from its enclosing scope even after the scope has closed.',
      'technical',
      ['JavaScript'],
      "easy",
      false
    ),
    new Question(
      6,
      'What are the SOLID principles in software engineering?',
      'The SOLID principles are a set of five design principles in software engineering that aim to make software designs more understandable, flexible, and maintainable. They include Single Responsibility Principle, Open/Closed Principle, Liskov Substitution Principle, Interface Segregation Principle, and Dependency Inversion Principle.',
      'technical',
      ['software engineering'],
      "easy",
      false
    ),
  ];
  constructor() { }
  getQuestionsObservable() {
    return this.questionsSubject.asObservable(); 
  }
  getQuestions(): Question[] {
    return this.questions;
  }
  addQuestion(question: Question) {
    this.questions.push(question);
    this.questionsSubject.next(this.questions); // Emit the updated questions
    console.log(this.questions)
  }
  sortByDate(){}
}
