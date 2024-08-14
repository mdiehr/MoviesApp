import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieService } from './services/movies.api';
import { Store } from '@ngrx/store';
import { AuthActions } from './state/auth.state';
import { catchError, throwError } from 'rxjs';
import { selectAuthFeature } from './state/selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  private store: Store = inject(Store);
  private movieService: MovieService = inject(MovieService);
  authStatus$ = this.store.select(selectAuthFeature);

  constructor() {
    this.authorizeService();
  }

  authorizeService() {
    this.movieService.getAuthToken().pipe(catchError((error) => {
      this.store.dispatch(AuthActions.error({ message: 'There was an error authenticating with the movie service.' }));
      return throwError(() => error);
    })).subscribe(result => {
      this.store.dispatch(AuthActions.authorized({ token: result.token }));
    });
  }
}
