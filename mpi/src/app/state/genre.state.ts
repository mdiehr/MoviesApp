import { createActionGroup, createReducer, on, props } from '@ngrx/store';
import { GenresResponse, GenreItem } from '../services/models';

export const GenreActions = createActionGroup({
  source: 'Genres',
  events: {
    'Retrieved Genres': props<{ genres: GenresResponse }>(),
  },
});

const initialGenresState: readonly GenreItem[] = [];
export const genresReducer = createReducer(
  initialGenresState,
  on(GenreActions.retrievedGenres, (state, { genres }) => {
    return [...state, ...genres.data];
  }),
)
