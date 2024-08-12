import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { map, mergeMap, Observable } from "rxjs";
import { MovieService } from "./movies.api";
import { Store } from "@ngrx/store";
import { selectIsAuthenticated } from "../state/selectors";

@Injectable({
  providedIn: 'root'
})
export class MovieTitleResolver implements Resolve<string>{

  private movieService: MovieService = inject(MovieService);
  private appTitle = "Moving Picture Interface";

  private store: Store = inject(Store);

  resolve(route: ActivatedRouteSnapshot): string | Observable<string> | Promise<string> {
    const movieId = route.params['id'];
    if (movieId) {
      return this.store.pipe(selectIsAuthenticated)
        .pipe(
          mergeMap(() => this.movieService.getMovieDetail(movieId)),
          map(movie => `${movie.title} - ${this.appTitle}`)
        );
    } else {
      return `${movieId} - ${this.appTitle}`;
    }
  }
}
