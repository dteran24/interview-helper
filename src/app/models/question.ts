export class Question {
  constructor(
    public id: number,
    public question: string,
    public answer: string,
    public type: string,
    public tags: string[],
    public difficulty: string,
    public selected: boolean
  ) {}
}

