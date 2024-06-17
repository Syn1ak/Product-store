import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { ErrorDto } from '../types/ErrorDto';

@Injectable({
  providedIn: 'root',
})
export default class ToastService {
  private toast = inject(MessageService);

  decorateRequest<T>(func: Observable<T>, successMsg: string = '') {
    return func.pipe(
      tap({
        next: () => this.success(successMsg),
        error: (err: ErrorDto) => this.error(err.message),
      })
    );
  }

  decorateError<T>(func: Observable<T>) {
    return func.pipe(
      tap({
        error: (err: ErrorDto) => this.error(err.message),
      })
    );
  }

  success(message: string) {
    this.toast.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  error(message: string) {
    this.toast.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
