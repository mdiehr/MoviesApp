import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth.state';
import { selectAuthStatusSettled } from '../state/selectors';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private store: Store = inject(Store);
  private router: Router = inject(Router);
  private authStatus$: Observable<AuthState> = this.store.pipe(selectAuthStatusSettled);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.authStatus$.pipe(map(authStatus => {
      console.info(authStatus);
      if (authStatus.loggedIn) {
        return true;
      } else {
        return this.router.parseUrl('/error');
      }
    }));
  }

}
