import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { reducer as appReducer } from './app/reducer'
import { reducer as playerReducer} from './player/reducer';
import { reducer as searchbarReducer } from './searchbar/reducer';
import { reducer as authReducer } from './auth/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    player: playerReducer,
    searchbar: searchbarReducer
})

const logger = (store) => (next) => (action) => {
    // console.log("Dispatching Action Logger1", action, store.getState())
    const value = next(action)

    // console.log("Now State in Logger1", store.getState());
    return value
}

const logger2 = (store) => (next) => (action) => {
    // console.log("Dispatching Action Logger2", action, store.getState())
    const value = next(action)

    // console.log("Now State in Logger2", store.getState());
    return value
}

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer,
    createComposer( applyMiddleware(logger, logger2))
    
)

export {store}