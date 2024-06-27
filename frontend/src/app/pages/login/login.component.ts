import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Credentials } from '../../core/types/Credentials';
import ToastService from '../../core/services/toast.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ControlsOf } from '../../core/models/forms/form-of';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  private toast = inject(ToastService);

  loginForm = new FormGroup<ControlsOf<Credentials>>({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  onLogin() {
    if (this.loginForm.invalid) return this.loginForm.markAllAsTouched();

    const user = this.loginForm.value as Credentials;
    this.toast.decorateRequest(this.authService.login(user), "User successfully logged in").subscribe({
      next: (token: string) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/products']);
      },
    });
  }

  get emailControl() {
    return this.loginForm.controls.email;
  }

  get passwordControl() {
    return this.loginForm.controls.password;
  }
}
