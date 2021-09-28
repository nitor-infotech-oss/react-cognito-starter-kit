import { persistReducer } from 'redux-persist';

import storageSession from 'redux-persist/lib/storage/session';

export const persist = (persistConfig, reducer) =>
  persistReducer({ ...persistConfig, storage: storageSession }, reducer);
