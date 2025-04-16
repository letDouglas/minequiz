export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  category: string;
  difficulty: string;
}
