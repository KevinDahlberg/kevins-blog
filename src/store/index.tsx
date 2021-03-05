import { AnyAction, applyMiddleware, compose, createStore, Store } from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducer from "./reducers";

export default function configureStore(preloadedState: any) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers: any = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store as Store<any, AnyAction>;
}
