import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  mobileMenuOpen = signal<boolean>(false);

  toogleMobileMenu() {
    this.mobileMenuOpen.update((val) => !val);
  }

  classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
}
