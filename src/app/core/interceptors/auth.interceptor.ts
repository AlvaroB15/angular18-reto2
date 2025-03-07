import { HttpInterceptorFn } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  const publicUrls = ['/api/register', '/api/login'];
  const isPublicUrl = publicUrls.some(url => req.url.includes(url));
  console.log(isPublicUrl);

  const token = localStorage.getItem('token');

  let authReq = req;

  if (!isPublicUrl) {
    authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        // Token expirado o inválido
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
