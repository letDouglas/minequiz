import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule per [ngClass]
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  // Aggiungi CommonModule agli imports
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
  // Flag: è TRUE se NON siamo sulla home, useremo questo per applicare lo sfondo borismina
  isNotHomePage = true;

  ngOnInit() {
    // Ascolta gli eventi di navigazione
    this.routerSubscription = this.router.events.pipe(
      // Filtra solo gli eventi di fine navigazione
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Controlla l'URL DOPO eventuali redirect
      this.isNotHomePage = event.urlAfterRedirects !== '/home';
      console.log('Route:', event.urlAfterRedirects, 'Apply standard BG:', this.isNotHomePage); // Per debug
    });
  }

  ngOnDestroy() {
    // Pulisci la sottoscrizione
    this.routerSubscription?.unsubscribe();
  }
}
