import { inject } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticatorService} from '@aws-amplify/ui-angular';


export const membersGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  const authService: AuthenticatorService = inject(AuthenticatorService);
  const router: Router = inject(Router);
  if (authService.authStatus=="authenticated")
    return true;
  else return false

};