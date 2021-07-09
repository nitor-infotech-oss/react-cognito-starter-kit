/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const APP_ERROR = 'APP/APP_ERROR';
export const RESET_SIGNIN = 'APP/RESET_SIGNIN';

export const LOGOUT = 'APP/LOGOUT';
export const LOGOUT_SUCCESS = 'APP/LOGOUT_SUCCESS';

export const LOGIN = 'APP/LOGIN';
export const LOGIN_SUCCESS = 'APP/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'APP/LOGIN_FAILURE';
export const RESET_LOGIN = 'APP/RESET_LOGIN';

export const REGISTER = 'APP/REGISTER';
export const REGISTER_SUCCESS = 'APP/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'APP/REGISTER_FAILURE';
export const RESET_REGISTER = 'APP/RESET_REGISTER';
