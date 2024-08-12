import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { GenreItem } from "../services/models";
import { MovieState } from "./movies.state";

export const selectAuthFeature = createFeatureSelector<AuthState>('auth');
export const selectGenresFeature = createFeatureSelector<ReadonlyArray<GenreItem>>('genres');
export const selectMoviesFeature = createFeatureSelector<MovieState>('movies');

export const selectToken = createSelector(selectAuthFeature, (authState) => {
  return authState.token;
})

export const selectIsAuthenticated = createSelector(selectAuthFeature, (authState) => {
  return authState.loggedIn;
})

export const selectMovies = createSelector(selectMoviesFeature, (feature) => feature.movies)

export const selectGenreTitles = createSelector(selectGenresFeature, (feature) => {
  return feature.map(g => g.title);
})
