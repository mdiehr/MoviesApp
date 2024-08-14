import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MovieItem } from '../services/models';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectMovieDetails } from '../state/selectors';
import { MovieSmallCardComponent } from '../movie-small-card/movie-small-card.component';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, AsyncPipe, MovieSmallCardComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.less'
})
export class MoviesComponent implements OnChanges {

  private store: Store = inject(Store);
  private movieService: MoviesService = inject(MoviesService);

  movieDetails$ = this.store.select(selectMovieDetails);
  
  @Input() movies: readonly MovieItem[] | null = [];

  ngOnChanges(changes: SimpleChanges) {
    if ("movies" in changes) {
      if (this.movies) {
        this.movies.forEach(m => {
          this.movieService.requestMovieDetailInBackground(m.id);
        })
      }
    }
  }
}
