import { createActionGroup, createReducer, on, props } from '@ngrx/store';


export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Authorized': props<{ token: string }>(),
    'Error': props<{ message: string }>(),
    'Healthcheck': props<{ healthy: boolean }>(),
  },
});

export interface AuthState {
  loading: boolean;
  token: string,
  loggedIn: boolean,
  error: boolean,
  errorMessage: string,
  healthy: boolean,
}

const initialAuthState: AuthState = {
  loading: true,
  token: '',
  loggedIn: false,
  error: false,
  errorMessage: '',
  healthy: false
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.authorized, (state, { token }) => {
    return {...state,
      token: token,
      loading: false,
      error: false,
      healthy: true,
      loggedIn: true
    };
  }),
  on(AuthActions.error, (state, { message }) => {
    return {...state,
      error: true,
      errorMessage: message,
      loading: false,
      loggedIn: false,
    };
  }),
  on(AuthActions.healthcheck, (state, { healthy }) => {
    return {...state, healthy: healthy };
  }),
)
