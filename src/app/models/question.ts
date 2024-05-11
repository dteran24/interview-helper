export class Question {
  constructor(
    public id: number,
    public question: string,
    public answer: string,
    public tag: string,
    public difficulty: number,
    public selected:boolean
  ) {}
}
