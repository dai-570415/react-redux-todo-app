import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import TodoApp from './containers/TodoApp';
import createStore from './store';

const history = createBrowserHistory();

const store = createStore(history);

ReactDOM.render(
  <Provider store={store}> 
    <ConnectedRouter history={history}>
      <TodoApp />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
