import { 
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
} from 'redux';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'react-router-redux';
import * as reducers from '../reducers';

const createStore = (history) => {
    return reduxCreateStore(
        combineReducers({
            ...reducers,
            router: connectRouter(history),
        }),
        applyMiddleware(
            routerMiddleware(history),
        ),
    );
}

export default createStore;