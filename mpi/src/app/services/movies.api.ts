import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnDestroy } from "@angular/core";
import { AuthResponse, GenresResponse, HealthcheckResponse, MovieExtendedDetail, MoviesResponse } from "./models";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { selectToken } from "../state/selectors";
import { GenreActions } from "../state/movies.state";


const BASE_URL = "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com.";

@Injectable({  providedIn: 'root',})
export class MovieService implements OnDestroy {

  private http: HttpClient = inject(HttpClient);
  private store: Store = inject(Store);

  private token$: Observable<string> = this.store.select(selectToken);
  private currentToken: string = '';

  private subscriptions: Subscription;

  constructor() {
    this.subscriptions = this.token$.subscribe(token => {
      this.currentToken = token;
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  _getHeaders(): { [header: string]: string } {
    return {
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.currentToken}`
    }
  }

  private genrePage = 1;
  loadAllGenres() {
    const limit = 5;
    const page = this.genrePage;
    this.getGenres(page, limit).subscribe(result => {
      this.store.dispatch(GenreActions.retrievedGenres({ genres: result }));
      // Call again in 1 tick if there are more pages to load
      if (result.totalPages > page) {
        this.genrePage += 1;
        window.setTimeout(() => (this.loadAllGenres()), 0);
      }
    });
  }

  getHealthCheck() {
    return this.http.get<HealthcheckResponse>(`${BASE_URL}/healthcheck`);
  }

  getAuthToken() {
    return this.http.get<AuthResponse>(`${BASE_URL}/auth/token`);
  }
  
  getGenres(page: number = 1, limit: number = 10) {
    return this.http.get<GenresResponse>(`${BASE_URL}/genres/movies`, {
      headers: this._getHeaders(),
      params: { page, limit }
    });
  }

  getMovies(page: number = 1, limit: number = 10, search?: string, genre?: string) {
    const params: { [param: string]: string | number } = { page, limit };
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
    });
  }
}
