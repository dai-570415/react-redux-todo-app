import { 
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
} from 'redux';
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'react-router-redux';
import tasksReducer from '../reducers/tasks';

const createStore = (history) => {
    return reduxCreateStore(
        combineReducers({
            tasks: tasksReducer,
            router: connectRouter(history),
        }),
        applyMiddleware(
            routerMiddleware(history),
        ),
    );
}

export default createStore;