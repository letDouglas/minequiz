import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [ CommonModule, RouterOutlet, RouterLink, RouterLinkActive ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private routerSubscription: Subscription | undefined;

  title = 'MineQuiz UI';
  currentYear = new Date().getFullYear();
  isNotHomePage = true;

  ngOnInit() {
    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isNotHomePage = event.urlAfterRedirects !== '/home';
      console.log('Route:', event.urlAfterRedirects, 'Apply standard BG:', this.isNotHomePage);
    });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }
}
