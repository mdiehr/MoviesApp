import { Component, inject } from '@angular/core';
import { MovieExtendedDetail } from '../services/models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [AsyncPipe, NgOptimizedImage, RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.less'
})
export class MovieDetailsComponent {

  private movieService: MoviesService = inject(MoviesService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  // Map the id in the route params to the movie details
  movie$: Observable<MovieExtendedDetail> = this.activatedRoute.params.pipe(
    map((p) => p['id']),
    switchMap(id => this.movieService.getMovieDetail(id)));
}
