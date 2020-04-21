import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import tasksReducer from './reducers/tasks';
import TodoApp from './containers/TodoApp';

// ReducerをStateに登録
const store = createStore(tasksReducer);

// 最終htmlに集約
const renderApp = (store) => {
  render(
    <Provider store={store}>
      <TodoApp />
    </Provider>,
    document.getElementById('root')
  );
}

store.subscribe(() => renderApp(store));
renderApp(store);
