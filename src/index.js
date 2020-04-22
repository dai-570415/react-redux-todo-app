import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import tasksReducer from './reducers/tasks';
import App from './App';
import TodoApp from './containers/TodoApp';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// ReducerをStateに登録
const store = createStore(tasksReducer);

// 最終htmlに集約
const renderApp = (store) => {
  render(
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={ App } />
        <Route exact path="/todo" component={ TodoApp } />
        <Route exact path="/todo/:id" component={ TodoApp } />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}

store.subscribe(() => renderApp(store));
renderApp(store);
