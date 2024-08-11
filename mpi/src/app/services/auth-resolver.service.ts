import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { selectIsAuthenticated } from '../state/selectors';

@Injectable({ providedIn: 'root' })
export class AuthResolverService implements Resolve<boolean> {

  private store: Store = inject(Store);
  private isAuthed$: Observable<boolean> = this.store.select(selectIsAuthenticated);

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    // Emit observable only on True values
    return this.isAuthed$.pipe(filter(p => p));
  }
}
