export class Question {
  constructor(
    private id: number,
    private question: string,
    private answer: string,
    private type: string,
    private tags: string[],
    private difficulty: string,
    private selected: boolean
  ) {}
  // Getter and Setter for id
  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  // Getter and Setter for question
  getQuestion(): string {
    return this.question;
  }

  setQuestion(question: string): void {
    this.question = question;
  }

  // Getter and Setter for answer
  getAnswer(): string {
    return this.answer;
  }

  setAnswer(answer: string): void {
    this.answer = answer;
  }

  // Getter and Setter for type
  getType(): string {
    return this.type;
  }

  setType(type: string): void {
    this.type = type;
  }

  // Getter and Setter for tags
  getTags(): string[] {
    return this.tags;
  }

  setTags(tags: string[]): void {
    this.tags = tags;
  }

  // Getter and Setter for difficulty
  getDifficulty(): string {
    return this.difficulty;
  }

  setDifficulty(difficulty: string): void {
    this.difficulty = difficulty;
  }

  // Getter and Setter for selected
  isSelected(): boolean {
    return this.selected;
  }

  setSelected(selected: boolean): void {
    this.selected = selected;
  }
}
export interface QuestionDTO {
  question: string;
  answer: string;
  type: string;
  tags: string[];
  difficulty: string;
  selected: boolean;
}
