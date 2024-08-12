import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnDestroy } from "@angular/core";
import { AuthResponse, GenresResponse, HealthcheckResponse, MovieExtendedDetail, MoviesResponse } from "./models";
import { Store } from "@ngrx/store";
import { firstValueFrom, Observable, Subscription, tap } from "rxjs";
import { selectGenresFeature, selectMovieDetails, selectToken } from "../state/selectors";
import { GenreActions } from "../state/genre.state";
import { MovieActions } from "../state/movies.state";


const BASE_URL = "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com";

@Injectable({  providedIn: 'root',})
export class MovieService implements OnDestroy {

  private http: HttpClient = inject(HttpClient);
  private store: Store = inject(Store);

  private token$: Observable<string> = this.store.select(selectToken);
  private currentToken = '';

  private subscriptions: Subscription;

  constructor() {
    this.subscriptions = this.token$.subscribe(token => {
      this.currentToken = token;
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  _getHeaders(): Record<string, string> {
    return {
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.currentToken}`
    }
  }

  
  getHealthCheck() {
    return this.http.get<HealthcheckResponse>(`${BASE_URL}/healthcheck`);
  }

  getAuthToken() {
    return this.http.get<AuthResponse>(`${BASE_URL}/auth/token`);
  }
  

  async loadAllGenres() {
    const genres = await firstValueFrom(this.store.select(selectGenresFeature))
    if (genres.length === 0) {
      this.loadGenresRecursive(1);
    }
  }

  private genrePage = 1;
  loadGenresRecursive(page: number) {
    const limit = 25; // As of publication there are ~22 genres
    this.getGenres(page, limit).subscribe(genres => {
      this.store.dispatch(GenreActions.retrievedGenres({ genres }));
      // Call again in 1 tick if there are more pages to load
      if (genres.totalPages > page) {
        this.genrePage += 1;
        window.setTimeout(() => (this.loadGenresRecursive(page + 1)), 0);
      }
    });
  }

  getGenres(page: number, limit: number) {
    return this.http.get<GenresResponse>(`${BASE_URL}/genres/movies`, {
      headers: this._getHeaders(),
      params: { page, limit }
    });
  }

  getMovies(page: number, limit: number, search?: string, genre?: string) {
    const params: Record<string, string | number> = { page, limit };
    if (search && search !== '') {
      params['search'] = search;
    }
    if (genre && genre !== '') {
      params['genre'] = genre;
    }
    return this.http.get<MoviesResponse>(`${BASE_URL}/movies`, {
      headers: this._getHeaders(),
      params: params
    });
  }

  getMovieDetail(id: string) {
    return this.http.get<MovieExtendedDetail>(`${BASE_URL}/movies/${id}`, {
      headers: this._getHeaders()
    }).pipe(
      tap(
        movie => this.store.dispatch(MovieActions.retrievedMovieDetails({ movie }))
      )
    );
  }

  // This is like getMovieDetail but it uses the movies data store as a cache, and doesn't return anything
  async requestMovieDetailInBackground(id: string) {
    // Check the data store
    const movieMap = await firstValueFrom(this.store.select(selectMovieDetails))
    if (!movieMap.has(id)) {
      // Load from API
      await firstValueFrom(this.getMovieDetail(id));
    }
  }
}
