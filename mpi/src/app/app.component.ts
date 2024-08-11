import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieService } from './services/movies.api';
import { Store } from '@ngrx/store';
import { AuthActions } from './state/auth.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'MPI';

  private store: Store = inject(Store);

  constructor(movieService: MovieService) {
    movieService.getAuthToken().subscribe(result => {
      this.store.dispatch(AuthActions.authorized({ token: result.token }));
    })
  }
}
