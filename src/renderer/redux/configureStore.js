import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger'
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

export default () => {
  const epicMiddleware = createEpicMiddleware();

  const middlewares = [
    epicMiddleware,
  ];

  if (process.env.NODE_ENV === 'development') middlewares.push(logger);

  const store = createStore(rootReducer(), undefined, applyMiddleware(...middlewares));

  epicMiddleware.run(rootEpic);

  return store
}