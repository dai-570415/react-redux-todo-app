import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import TodoApp from './containers/TodoApp';
import App from './App';
import createStore from './store';
import { Switch ,Route } from 'react-router-dom';

const history = createBrowserHistory();

const store = createStore(history);

ReactDOM.render(
  <Provider store={store}> 
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={ App } />
        <Route exact path="/todo" component={ TodoApp } />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
