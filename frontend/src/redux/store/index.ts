import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const persistConfig = {
  key: 'githubSearch',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

const middleware = applyMiddleware(thunk);
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

export { store, persistor };