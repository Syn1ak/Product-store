import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Credentials } from '../types/Credentials';
import { api } from '../api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  public user$ = new BehaviorSubject<Credentials | null>(null);

  getCurrentUser() {
    return this.user$.getValue();
  }

  login(user: Credentials) {
    console.log(user);

    return this.http
      .post<string>(`${api}/login`, {
        ...user,
      })
      .pipe(
        catchError((err) => {
          throw err.error;
        }),
        tap((res) => {
          this.user$.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  logout() {
    this.user$.next(null);
  }
}
