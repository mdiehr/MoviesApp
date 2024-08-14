import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { GenreItem } from "../services/models";
import { MovieState } from "./movies.state";
import { filter, pipe } from "rxjs";

export const selectAuthFeature = createFeatureSelector<AuthState>('auth');
export const selectGenresFeature = createFeatureSelector<readonly GenreItem[]>('genres');
export const selectMoviesFeature = createFeatureSelector<MovieState>('movies');

export const selectToken = createSelector(selectAuthFeature, (authState) => {
  return authState.token;
})

export const selectIsLoggedIn = createSelector(selectAuthFeature, (authState) => {
  return authState.loggedIn;
});

// Auth status but only after done loading
export const selectAuthStatusSettled = pipe(
  select(selectAuthFeature),
  filter(authStatus => !authStatus.loading),
)

export const selectIsAuthenticated = pipe(
  select(selectIsLoggedIn),
  filter(val => val)
);

export const selectMovies = createSelector(selectMoviesFeature, (feature) => feature.movies)

export const selectGenreTitles = createSelector(selectGenresFeature, (feature) => {
  return feature.map(g => g.title);
})

export const selectMovieDetails = createSelector(selectMoviesFeature, (feature) => feature.movieDetails);
