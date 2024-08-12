import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAuthenticated } from '../state/selectors';

@Injectable({ providedIn: 'root' })
export class AuthResolverService implements Resolve<boolean> {

  private store: Store = inject(Store);

  resolve(): Observable<boolean> {
    // Emit observable only on True values
    return this.store.pipe(selectIsAuthenticated);
  }
}
