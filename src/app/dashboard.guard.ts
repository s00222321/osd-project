import { inject } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import { AuthenticatorService} from '@aws-amplify/ui-angular';
import { UserstateService } from './userstate.service';

import { fetchUserAttributes } from 'aws-amplify/auth';

export const dashboardGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {

    const authService: AuthenticatorService = inject(AuthenticatorService);
    const router: Router = inject(Router);
    const userstate:UserstateService=inject(UserstateService);
 
    if (userstate.get_admin()) 
      return true;
    else
      return false

};