import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthActions, AuthState } from '../state/auth.state';
import { selectAuthFeature } from '../state/selectors';
import { AsyncPipe } from '@angular/common';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-connection-status',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './connection-status.component.html',
  styleUrl: './connection-status.component.less'
})
export class ConnectionStatusComponent {

  private movieService: MoviesService = inject(MoviesService);
  private store: Store = inject(Store);
  authStatus$: Observable<AuthState> = this.store.select(selectAuthFeature);
  
  constructor() {
    this.movieService.getHealthCheck().pipe(catchError((error) => {
      this.store.dispatch(AuthActions.healthcheck({ healthy: false }));
      return throwError(() => error);
    })).subscribe(result => {
      this.store.dispatch(AuthActions.healthcheck({ healthy: result.contentful }));
    });
  }
}
