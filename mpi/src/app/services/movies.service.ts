import { inject, Injectable, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { firstValueFrom, Observable, Subscription, tap } from "rxjs";
import { selectGenresFeature, selectMovieDetails, selectToken } from "../state/selectors";
import { GenreActions } from "../state/genre.state";
import { MovieActions } from "../state/movies.state";
import { MoviesApiService } from "./movies-api.service";

@Injectable({
  providedIn: 'root'
})
export class MoviesService implements OnDestroy {

  private api: MoviesApiService = inject(MoviesApiService)
  private store: Store = inject(Store);
  private token$: Observable<string> = this.store.select(selectToken);
  private subscriptions: Subscription;

  constructor() {
    this.subscriptions = this.token$.subscribe(token => {
      this.api.setToken(token);
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getHealthCheck() {
    return this.api.getHealthCheck();
  }

  getAuthToken() {
    return this.api.getAuthToken();
  }

  getMovies(page: number, limit: number, search?: string, genre?: string) {
    return this.api.getMovies(page, limit, search, genre);
  }
  
  // Loads the list of genres from the service (first time only)
  async loadAllGenres() {
    const genres = await firstValueFrom(this.store.select(selectGenresFeature))
    if (genres.length === 0) {
      this.loadGenresRecursive(1);
    }
  }

  // Load successive pages of genres, but the initial limit is set so we probably only need to GET once
  private genrePage = 1;
  loadGenresRecursive(page: number) {
    const limit = 25; // As of publication there are ~22 genres
    this.api.getGenres(page, limit).subscribe(genres => {
      this.store.dispatch(GenreActions.retrievedGenres({ genres }));
      // Call again in 1 tick if there are more pages to load
      if (genres.totalPages > page) {
        this.genrePage += 1;
        window.setTimeout(() => (this.loadGenresRecursive(page + 1)), 0);
      }
    });
  }

  // Get the detail but also stick it into the store
  getMovieDetail(id: string) {
    return this.api.getMovieExtendedDetail(id).pipe(
      tap(
        movie => this.store.dispatch(MovieActions.retrievedMovieDetails({ movie }))
      )
    );
  }

  // This is like getMovieDetail but self-subscribes and doesn't return anything
  // This is so that a component can request a movie detail separately from
  // handling the result, which will come through the data store
  async requestMovieDetailInBackground(id: string) {
    // Check the data store
    const movieMap = await firstValueFrom(this.store.select(selectMovieDetails))
    if (!movieMap.has(id)) {
      // Load from API
      await firstValueFrom(this.getMovieDetail(id));
    }
  }
}
