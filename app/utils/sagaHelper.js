import { put } from 'redux-saga/effects';

import { logAppAppError } from 'containers/App/actions';

export function* apiResponseEvaluator(
  response,
  onSuccess,
  onError,
  optionalData = {},
) {
  const data =
    Object.keys(optionalData).length > 0
      ? { ...optionalData, statusText: response.statusText }
      : undefined;
  switch (response.status) {
    case 404: {
      return yield put(
        onError(
          response.data
            ? response.data
            : `The URL ${response.request.responseURL} could not be found`,
        ),
      );
    }
    case 401:
      return yield put(
        onError(
          response.error || {
            payload: { result: `Invalid Username/password` },
          },
        ),
      );
    case 403:
      return yield put(
        onError(
          response.error || {
            payload: { result: `Invalid Username/password` },
          },
        ),
      );
    case 409:
      return yield put(onError(response));
    case 422:
      return onError
        ? yield put(onError(response.data))
        : yield put(logAppAppError(response.statusText));
    case 200:
      yield put(logAppAppError()); // set APP error to empty
      return yield put(onSuccess(response.data));
    default:
      return yield put(onError(data || response.statusText));
  }
}
