import { Component, inject } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { MoviesComponent } from '../movies/movies.component';
import { MovieItem } from '../services/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectMovies, selectMoviesFeature } from '../state/selectors';
import { AsyncPipe } from '@angular/common';
import { MovieState } from '../state/movies.state';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PaginationControlsComponent } from '../pagination-controls/pagination-controls.component';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchbarComponent, MoviesComponent, AsyncPipe, RouterLink, PaginationControlsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

  private store: Store = inject(Store);
  private movieService: MoviesService = inject(MoviesService);

  public movies$: Observable<readonly MovieItem[]> = this.store.select(selectMovies);
  public moviesFeature$: Observable<MovieState> = this.store.select(selectMoviesFeature);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public page = 1;
  public search?: string;
  public genre?: string;

  constructor() {
    this.activatedRoute.queryParamMap.subscribe(map => {
      this.page = Number.parseInt(map.get('page') || '1');
      this.search = map.get('search') || '';
      this.genre = map.get('genre') || '';
    });

    // The movie service will dump these into the data store
    this.movieService.loadAllGenres();
  }

}
