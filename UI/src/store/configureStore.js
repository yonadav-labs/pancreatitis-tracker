import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import rootReducer from "../container/reducers/index";
import { createLogger } from "redux-logger";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
	middleware.push(createLogger());
}

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(...middleware))
);
export const history = createHistory();
