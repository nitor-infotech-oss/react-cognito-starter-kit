export const APP_REGION =
  process.env.environment === 'production' ? 'APP_REGION' : 'APP_REGION';

export const USER_POOL_ID =
  process.env.environment === 'production'
    ? 'USER_POOL_ID'
    : 'USER_POOL_ID';

export const USER_POOL_WEB_CLIENT_ID =
  process.env.environment === 'production'
    ? 'USER_POOL_WEB_CLIENT_ID'
    : 'USER_POOL_WEB_CLIENT_ID';
