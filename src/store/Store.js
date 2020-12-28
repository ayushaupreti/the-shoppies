import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import createRootReducer from './reducers/RootReducer';

const logger = createLogger({ collapsed: false })

const initialState = {}

export default function configureStore() {
  const store = createStore(
    createRootReducer(), 
    initialState,
    applyMiddleware(thunk, logger)
  );

  return store
}