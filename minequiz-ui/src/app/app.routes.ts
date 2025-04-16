import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'quiz',
    loadComponent: () => import('./core/features/quiz/quiz.component').then(m => m.QuizComponent)
  },
  {
    path: '',
    redirectTo: '/quiz',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/quiz'
  }
];
