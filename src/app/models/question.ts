export interface Question {
  id: number;
  question: string;
  answer: string;
  type: string;
  tags: string[];
  difficulty: string;
  selected: boolean;
}
export interface QuestionDTO {
  question: string;
  answer: string;
  type: string;
  tags: string[];
  difficulty: string;
  selected: boolean;
}
