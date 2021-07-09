/* eslint-disable indent */
import axios, { CancelToken } from 'axios';
import qs from 'qs';

// import {
//   API_URL,
//   NEW_API_URL,
//   INTEGRATION_API,
//   REST_API_URL,
//   CONNECT_API_URL,
//   HINT_URL,
// } from 'utils/config';
let cancel;

export const integrationApi = axios.create({
  baseURL: 'https://api.promaptools.com/service/us/zip-lat-lng/get',
});

[integrationApi].forEach(item => {
  if (cancel !== undefined) {
    cancel();
  }

  const cancellableConfig = config => {
    const newConfig = Object.assign({}, config);
    newConfig.cancelToken = new CancelToken(function executor(c) {
      cancel = c;
    });
    return newConfig;
  };

  item.interceptors.request.use(
    config => cancellableConfig(config),
    error => Promise.reject(error),
  );
  item.interceptors.response.use(
    response => response,
    error => {
      // Do something with response error
      // if (!error.response) return Promise.reject(error);
      switch (error.response.status) {
        case 401: {
          const payload = error.response
            ? { status: 401, error: error.response.messsage || error.response }
            : {
                status: 401,
                error: 'User not Authorized',
              };
          return payload;
        }
        case 403: {
          const payload = error.response
            ? {
                status: 403,
                error: error.response.data.messsage || error.response,
              }
            : {
                status: 403,
                error: 'User not Authorized',
              };
          return payload;
        }
        case 422:
        case 404:
        case 400:
          return error.response;
        case 409:
          return { status: 409, error: error.response.data };
        default:
          return Promise.reject(error);
      }
    },
  );
});
