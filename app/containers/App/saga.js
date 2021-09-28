import { takeLatest, call, put } from 'redux-saga/effects';

import { apiResponseEvaluator } from 'utils/sagaHelper';

import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import { USER_POOL_ID, USER_POOL_WEB_CLIENT_ID } from 'utils/config';
import { REGISTER, LOGIN } from './constants';

import {
  logAppAppError,
  //   registerData,
  registerDataSuccess,
  registerDataFailure,
  loginDataSuccess,
  loginDataFailure,
} from './actions';

// import { integrationApi } from 'utils/api';

const poolData = {
  UserPoolId: USER_POOL_ID, // Your user pool id here
  ClientId: USER_POOL_WEB_CLIENT_ID, // Your client id here
};

const userPool = new CognitoUserPool(poolData);

const doRegisterUser = async ({ payload }) => {
  const dataFirstName = {
    Name: 'given_name',
    Value: payload.firstName,
  };
  const dataLastName = {
    Name: 'family_name',
    Value: payload.lastName,
  };
  const dataEmail = {
    Name: 'email',
    Value: payload.email,
  };
  const dataDepartment = {
    Name: 'custom:department',
    Value: payload.department,
  };
  const attributeList = [];

  const attributeEmail = new CognitoUserAttribute(dataEmail);
  const attributeFirstName = new CognitoUserAttribute(dataFirstName);
  const attributeLastName = new CognitoUserAttribute(dataLastName);
  const attributeDepartment = new CognitoUserAttribute(dataDepartment);

  attributeList.push(attributeEmail);
  attributeList.push(attributeFirstName);
  attributeList.push(attributeLastName);
  attributeList.push(attributeDepartment);

  const result = new Promise(resolve => {
    userPool.signUp(
      payload.email,
      payload.password,
      attributeList,
      [],
      (err, resultdata) => {
        if (err) {
          const error = err;
          error.username = payload.email;
          resolve({ status: 404, data: error });
          return;
        }
        const cognitoUser = resultdata.user;
        resolve({ status: 200, data: cognitoUser });
      },
    );
  });
  return result;
};

export function* doRegisterUserSaga({ payload }) {
  try {
    // const token = yield getVerifyToken();

    const response = yield call(doRegisterUser, { payload });

    yield apiResponseEvaluator(
      response,
      registerDataSuccess,
      registerDataFailure,
    );
  } catch (ex) {
    yield put(logAppAppError(ex));
  }
}

const dologinUser = ({ payload }) => {
  const authenticationData = {
    Username: payload.email,
    Password: payload.password,
  };

  const user = new CognitoUser({ Username: payload.email, Pool: userPool });

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const result = new Promise(resolve => {
    user.authenticateUser(authenticationDetails, {
      onSuccess: resultdata => {
        resolve({ status: 200, data: resultdata });
      },
      onFailure: err => {
        resolve({ status: 404, data: err });
      },
    });
  });

  return result;
};

export function* doLoginUserSaga({ payload }) {
  try {
    // const token = yield getVerifyToken();
    const response = yield call(dologinUser, { payload });
    yield apiResponseEvaluator(response, loginDataSuccess, loginDataFailure);
  } catch (ex) {
    yield put(logAppAppError(ex));
  }
}

export default function* saga() {
  yield takeLatest(REGISTER, doRegisterUserSaga);
  yield takeLatest(LOGIN, doLoginUserSaga);
}
