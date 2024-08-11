import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { GenreItem, MovieItem } from "../services/models";
import { MovieState } from "./movies.state";

export const selectAuthFeature = createFeatureSelector<AuthState>('auth');
export const selectGenresFeature = createFeatureSelector<ReadonlyArray<GenreItem>>('genres');
export const selectMoviesFeature = createFeatureSelector<MovieState>('movies');

export const selectToken = createSelector(selectAuthFeature, (authState) => {
  return authState.token;
})

export const selectMovies = createSelector(selectMoviesFeature, (feature) => feature.movies)