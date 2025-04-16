import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question.model';
import { environment } from '../../../../environments/environment';

type QuizPhase = 'loading' | 'active' | 'results';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  private quizService = inject(QuizService);

  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  selectedAnswerIndex: number | null = null;
  isAnswerSubmitted: boolean = false;
  quizPhase: QuizPhase = 'loading';
  errorMessage: string | null = null;

  get currentQuestion(): Question | undefined {
    return this.questions[this.currentQuestionIndex];
  }

  ngOnInit(): void {
    this.loadQuiz();
  }

  loadQuiz(): void {
    this.quizPhase = 'loading';
    this.errorMessage = null;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswerIndex = null;
    this.isAnswerSubmitted = false;

    this.quizService.getQuizQuestions().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.questions = data;
          this.quizPhase = 'active';
          console.log('Quiz caricato con', this.questions.length, 'domande.');
        } else {
          this.errorMessage = "Nessuna domanda caricata dal backend.";
          this.quizPhase = 'loading';
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Errore durante il caricamento del quiz:', error);
        this.errorMessage = `Impossibile caricare il quiz. Backend attivo su ${environment.apiUrl}? (${error.statusText})`;
        this.quizPhase = 'loading';
      }
    });
  }

  selectAnswer(index: number): void {
    if (!this.isAnswerSubmitted) {
      this.selectedAnswerIndex = index;
      console.log('Risposta selezionata:', index);
    }
  }

  submitAnswer(): void {
    if (this.selectedAnswerIndex === null || !this.currentQuestion) {
      return;
    }

    this.isAnswerSubmitted = true;
    const correctAnswer = this.currentQuestion.correctAnswerIndex;

    if (this.selectedAnswerIndex === correctAnswer) {
      this.score++;
      console.log('Risposta CORRETTA!');
    } else {
      console.log('Risposta SBAGLIATA! (Corretta era: ' + correctAnswer + ')');
    }

    setTimeout(() => this.goToNextQuestion(), 1000);
  }

  goToNextQuestion(): void {
    if (!this.isAnswerSubmitted) return;

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswerIndex = null;
      this.isAnswerSubmitted = false;
    } else {
      this.showResults();
    }
  }

  showResults(): void {
    this.quizPhase = 'results';
    console.log('Quiz completato! Punteggio:', this.score, '/', this.questions.length);
  }

  restartQuiz(): void {
    this.loadQuiz();
  }

  getOptionClass(index: number): string {
    const baseClass = 'border-2 shadow-md';
    if (!this.isAnswerSubmitted) {
      return this.selectedAnswerIndex === index
        ? `${baseClass} border-blue-500 bg-blue-200 dark:bg-blue-700`
        : `${baseClass}`;
    }

    const isCorrect = this.currentQuestion?.correctAnswerIndex === index;
    const isSelected = this.selectedAnswerIndex === index;

    if (isCorrect) {
      return `${baseClass} bg-green-200 dark:bg-green-800 border-green-500 text-green-900 dark:text-green-100 font-bold`;
    } else if (isSelected && !isCorrect) {
      return `${baseClass} bg-red-200 dark:bg-red-800 border-red-500 text-red-900 dark:text-red-100 font-bold`;
    } else {
      return `${baseClass} bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 opacity-70`;
    }
  }
}
