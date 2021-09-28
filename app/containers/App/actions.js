import {
  APP_ERROR,
  RESET_SIGNIN,
  LOGOUT,
  LOGOUT_SUCCESS,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RESET_REGISTER,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_LOGIN,
} from './constants';

export function logAppAppError(payload) {
  return {
    type: APP_ERROR,
    payload,
  };
}

export function resetSignin(payload) {
  return {
    type: RESET_SIGNIN,
    payload,
  };
}

export function logoutUser(payload) {
  return { type: LOGOUT, payload };
}

export function setLogoutSuccess(payload) {
  return { type: LOGOUT_SUCCESS, payload };
}

export function registerData(payload) {
  return { type: REGISTER, payload };
}

export function registerDataSuccess(payload) {
  return { type: REGISTER_SUCCESS, payload };
}

export function registerDataFailure(payload) {
  return { type: REGISTER_FAILURE, payload };
}

export function registerDataReset(payload) {
  return { type: RESET_REGISTER, payload };
}

export function loginData(payload) {
  return { type: LOGIN, payload };
}

export function loginDataSuccess(payload) {
  return { type: LOGIN_SUCCESS, payload };
}

export function loginDataFailure(payload) {
  return { type: LOGIN_FAILURE, payload };
}

export function loginDataReset(payload) {
  return { type: RESET_LOGIN, payload };
}
