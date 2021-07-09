/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import appReducer, { legacyMigrations } from 'containers/App/reducer';
import { createMigrate } from 'redux-persist';
import { persist } from 'utils/reduxPersist';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
const MIGRATION_DEBUG = false;
const legacyPersistConfig = {
  key: 'persistedLegacy',
  version: 1.2,
  migrate: createMigrate(legacyMigrations, { debug: MIGRATION_DEBUG }),
};

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    appReducer: persist(legacyPersistConfig, appReducer),
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
