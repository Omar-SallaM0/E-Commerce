import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from '../core/services/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
const router = inject(Router);
  const auth = inject(AuthServiceService);
  if (localStorage.getItem('token')) {
    return true;
  } else {
    return router.createUrlTree(['login']);
  }
};
