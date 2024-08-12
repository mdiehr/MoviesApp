import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { MovieItem } from '../services/models';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { MovieService } from '../services/movies.api';
import { selectMovieDetails } from '../state/selectors';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, AsyncPipe],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.less'
})
export class MoviesComponent {

  private store: Store = inject(Store);
  private movieService: MovieService = inject(MovieService);

  movieDetails$ = this.store.select(selectMovieDetails);
  
  @Input() movies: readonly MovieItem[] | null = [];

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if ("movies" in changes) {
      console.info('Movies changed');
      if (this.movies) {
        this.movies.forEach(m => {
          this.movieService.requestMovieDetailInBackground(m.id);
        })
      }
    }
  }
}
