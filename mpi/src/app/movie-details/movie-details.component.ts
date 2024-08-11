import { Component, inject } from '@angular/core';
import { MovieExtendedDetail } from '../services/models';
import { MovieService } from '../services/movies.api';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.less'
})
export class MovieDetailsComponent {

  private movieService: MovieService = inject(MovieService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  // Map the id in the route params to the movie details
  movie$: Observable<MovieExtendedDetail> = this.activatedRoute.params.pipe(
    map((p) => p['id']),
    switchMap(id => this.movieService.getMovieDetail(id)));

  constructor() {
  }


}
