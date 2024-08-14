import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse, GenresResponse, HealthcheckResponse, MovieExtendedDetail, MoviesResponse } from "./models";
import { BASE_URL } from "../constants/config";

// API Spec from https://github.com/<removed>/movies-api/tree/main

// As much as possible, this service accesses the REST apis without additional logic or side effects

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  private http: HttpClient = inject(HttpClient);
  private currentToken = '';
  public setToken(token: string) {
    this.currentToken = token;
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


  getMovieExtendedDetail(id: string) {
    return this.http.get<MovieExtendedDetail>(`${BASE_URL}/movies/${id}`, {
      headers: this._getHeaders()
    });
  }
}
