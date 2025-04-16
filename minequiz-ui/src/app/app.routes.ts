import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./core/features/home/home.component').then(m => m.HomeComponent),
    title: 'MineQuiz - Home'
  },
  {
    path: 'about',
    loadComponent: () => import('./core/features/about/about.component').then(m => m.AboutComponent),
    title: 'MineQuiz - About Us'
  },
  {
    path: 'contact',
    loadComponent: () => import('./core/features/contact/contact.component').then(m => m.ContactComponent),
    title: 'MineQuiz - Contact'
  },
  {
    path: 'quiz',
    loadComponent: () => import('./core/features/quiz/quiz.component').then(m => m.QuizComponent),
    title: 'MineQuiz - Start!'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
