import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    setHeaders: {
      ...req.headers.keys().reduce((acc, key) => {
        acc[key] = req.headers.get(key) || '';
        return acc;
      }, {} as { [key: string]: string }),
      Authorization: req.url.includes('api/login')
        ? ''
        : localStorage.getItem('token') || '',
    },
  });

  // Pass the cloned request instead of the original request to the next handle
  return next(clonedRequest);
};
