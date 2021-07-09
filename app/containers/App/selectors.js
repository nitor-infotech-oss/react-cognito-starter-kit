import { createSelector } from 'reselect';

const selectRouter = state => state.router;

const portalSelector = state => state.appReducer || initialState;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectRegister = () =>
  createSelector(
    portalSelector,
    subState => subState.register,
  );

const makeSelectLogin = () =>
  createSelector(
    portalSelector,
    subState => subState.auth,
  );

export { makeSelectLocation, makeSelectRegister, makeSelectLogin };
