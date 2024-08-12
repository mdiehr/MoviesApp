import { createActionGroup, createReducer, emptyProps, on, props } from '@ngrx/store';
import { GenresResponse, MovieItem, MovieExtendedDetail, MoviesResponse } from '../services/models';

export const MovieActions = createActionGroup({
  source: 'Movies',
  events: {
    'Fetching Movies': emptyProps(),
    'Retrieved Movies': props<{ movies: MoviesResponse, page: number }>(),
    'Retrieved Movie Details': props<{ movie: MovieExtendedDetail }>(),
    'Retrieved Genres': props<{ genres: GenresResponse }>(),
  },
});

export interface MovieState {
  movies: readonly MovieItem[];
  loading: boolean;
  initial: boolean;
  page: number;
  pageMax: number;
}

const initialMoviesState: MovieState = {
  movies: [],
  loading: false,
  initial: true,
  page: 1,
  pageMax: 1,
};

export const moviesReducer = createReducer(
  initialMoviesState,
  on(MovieActions.retrievedMovies, (state, { movies, page }) => {
    return {...state,
      movies: movies.data,
      page: page,
      pageMax: movies.totalPages,
      loading: false, initial: false };
  }),
  on(MovieActions.fetchingMovies, (state) => {
    return {...state, loading: true };
  }),
)

