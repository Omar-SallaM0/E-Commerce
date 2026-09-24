import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  if(!localStorage.getItem('token')){
    const router = inject(Router);
    router.navigate(['auth/login']);
    return false;
  }
  return true;
};
