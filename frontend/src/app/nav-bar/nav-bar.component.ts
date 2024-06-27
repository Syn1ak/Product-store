import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  public authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (!user) return;
    this.authService.login(JSON.parse(user)).subscribe({
      next: (token: string) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/products']);
      },
    });
  }

  mobileMenuOpen = signal<boolean>(false);

  toogleMobileMenu() {
    this.mobileMenuOpen.update((val) => !val);
  }

  classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
