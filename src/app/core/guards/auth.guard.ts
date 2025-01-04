import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    return router.navigate(['/login']).then(() => false);
  }

  return true;
};
