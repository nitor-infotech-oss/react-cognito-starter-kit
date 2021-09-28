import produce from 'immer';
import {
  APP_ERROR,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RESET_REGISTER,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_LOGIN,
} from './constants';

const defaultProps = {
  loading: false,
  data: false,
  error: false,
  saved: false,
};

export const initialState = {
  register: {
    ...defaultProps,
  },
  auth: {
    ...defaultProps,
  },
};

export const legacyMigrations = {
  1.2: previousVersionState => ({
    legacy: {
      change: previousVersionState,
      lastUpdate: new Date(),
    },
  }),
};

/* eslint-disable default-case, no-param-reassign */
const registerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_LOGIN: {
        const keys = Object.keys(initialState);
        keys.forEach(key => {
          draft[key] = initialState[key];
        });

        break;
      }
      case REGISTER:
        draft.register = {
          loading: true,
          data: false,
          error: false,
        };
        break;
      case REGISTER_SUCCESS:
        draft.register = {
          loading: false,
          data: action.payload,
          error: false,
        };
        break;
      case REGISTER_FAILURE:
        draft.register = {
          loading: false,
          data: false,
          error: action.payload,
        };
        break;
      case RESET_REGISTER:
        draft.register = {
          ...defaultProps,
        };
        break;
      case LOGIN:
        draft.auth = {
          loading: true,
          data: false,
          error: false,
        };
        break;
      case LOGIN_SUCCESS:
        draft.auth = {
          loading: false,
          data: action.payload,
          error: false,
        };
        break;
      case LOGIN_FAILURE:
        draft.auth = {
          loading: false,
          data: false,
          error: action.payload,
        };
        break;
      // case RESET_LOGIN:
      //   draft = initialState;
      //   break;
      case APP_ERROR:
        draft.appError = {
          error: action.payload,
        };
        break;
    }
  });

export default registerReducer;
