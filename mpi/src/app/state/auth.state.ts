import { createActionGroup, createReducer, on, props } from '@ngrx/store';


export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Authorized': props<{ token: string }>(),
    'Healthcheck': props<{ healthy: boolean }>(),
  },
});

export interface AuthState {
  token: string,
  loggedIn: boolean,
  healthy: boolean,
}
const initialAuthState: AuthState = { token: '', loggedIn: false, healthy: true };

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.authorized, (state, { token }) => {
    return {...state, token: token, healthy: true, loggedIn: true };
  }),
  on(AuthActions.healthcheck, (state, { healthy }) => {
    return {...state, healthy: healthy };
  }),
)
