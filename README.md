# プロジェクトダウンロード&起動

```bash
$ git clone https://github.com/dai-570415/react-redux-todo-app.git

$ cd react-redux-todo-app

$ npm install

$ npm start
```

# Redux

Reduxとは状態管理のモジュール

インストール

```bash
$ npm install --save redux
```

## Reduxの基本形

```js:index.js
import { createStore } from 'redux';

// 初期値
const initialState = {
    tasks: [],
}

// Reducer(actionから渡ってきた情報で状態を変化させる)
const tasksReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: state.tasks.concat([action.payload.task])
      };
    default:
        return state;
  }
}

// Reducerをstoreに登録
const store = createStore(tasksReducer);


const handleChange = () => {
    // store.getState()で情報取得
    console.log(store.getState());
}
// subscribe = Dispatchによってstoreの状態が変わったか監視
const unsubscribe = store.subscribe(handleChange);

// actionタイプ
const addTask = (task) => ({
    type: 'ADD_TASK',
    payload: {
        task,
    }
});

// actionへDispatch(情報を送信) ※本来はViewからおこなう
store.dispatch(addTask('Storeを学ぶ'));
```

# Reactに組み合わせる

```jsx:index.js
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';

// State(初期値)
const initialState = {
  task: '',
  tasks: [],
}

// Reducer
const tasksReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INPUT_TASK':
      return {
        ...state,
        task: action.payload.task
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: state.tasks.concat([action.payload.task])
      };
    default:
      return state;
  }
}

// ReducerをStateに登録
const store = createStore(tasksReducer);

// Action
const inputTask = (task) => ({
  type: 'INPUT_TASK',
  payload: {
    task,
  }
});
const addTask = (task) => ({
  type: 'ADD_TASK',
  payload: {
    task,
  }
});

// コンポーネント(ActionへDispatch)
const TodoApp = ({ store }) => {
  const { task, tasks } = store.getState();
  
  return (
    <div>
      <input
        type="text"
        placeholder="Please Input"
        onChange={(e) => store.dispatch(inputTask(e.target.value))}
      />
      <input
        type="button"
        value="add"
        onClick={ () => store.dispatch(addTask(task)) }
      />
      <ul>
        {
          tasks.map((item, i) => {
            return (
              <li key={i}>{item}</li>
            );
          })
        }
      </ul>
    </div>
  );
}

// 最終htmlに集約
const renderApp = (store) => {
  render(
    <TodoApp store={store} />,
    document.getElementById('root')
  );
}

store.subscribe(() => renderApp(store));
renderApp(store);
```

## ファイルを分割する
.

├── index.js

├── components

      └── TodoApp.js

├── actions

      └── tasks.js

└── reducers

      └── tasks.js

```js:reducers/tasks.js
// State(初期値)
const initialState = {
    task: '',
    tasks: [],
}

// Reducer
const tasksReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INPUT_TASK':
        return {
            ...state,
            task: action.payload.task
        };
        case 'ADD_TASK':
        return {
            ...state,
            tasks: state.tasks.concat([action.payload.task])
        };
        default:
        return state;
    }
}

// 追加
export default tasksReducer;
```

```js:actions/actions.js
// Action
// export追加
export const inputTask = (task) => ({
    type: 'INPUT_TASK',
    payload: {
        task,
    }
});

// export追加
export const addTask = (task) => ({
    type: 'ADD_TASK',
    payload: {
        task,
    }
});
```

```jsx:components/TodoApp.js
import React from 'react';
// さきほど分割したActionを追加
import { inputTask, addTask } from '../actions/tasks';

// コンポーネント(ActionへDispatch)
const TodoApp = ({ store }) => {
    const { task, tasks } = store.getState();

    return (
        <div>
            <input
                type="text"
                placeholder="Please Input"
                onChange={(e) => store.dispatch(inputTask(e.target.value))}
            />
            <input
                type="button"
                value="add"
                onClick={ () => store.dispatch(addTask(task)) }
            />
            <ul>
                {tasks.map((item, i) => {
                    return <li key={i}>{item}</li>;
                })}
            </ul>
        </div>
    );
}

// 追加
export default TodoApp;
```

```jsx:index.js
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
// さきほど分割したReducerとComponentsを追加
import tasksReducer from './reducers/tasks';
import TodoApp from './components/TodoApp';

// ReducerをStateに登録
const store = createStore(tasksReducer);

// 最終htmlに集約
const renderApp = (store) => {
  render(
    <TodoApp store={store} />,
    document.getElementById('root')
  );
}

store.subscribe(() => renderApp(store));
renderApp(store);
```

# react-reduxのインストール

```bash
$ npm install --save react-redux
```

```jsx:index.js
import { Provider } from 'react-redux';
```

#### 注. react-reduxモジュール入れる際に起こったエラー

プロジェクト名（フォルダ名）を同名の「react-redux」にしていたところ
「$ npm install --save react-redux」
でモジュールを追加しようとしたエラーとなりましたので
React以外でも同じ現象が起こる可能性がありますので共有します。

#### 解決策
- フォルダ名を別の名前に変える
- package.jsonのnameを変更した名前に修正する

[解決に至ったURL](https://stackoverflow.com/questions/42436789/installing-react-redux-from-cmd-error?rq=1)

# Todoアプリにreact-reduxを導入する

.

├── index.js

├── containers ※追加

    └── TodoApp.js ※追加

├── components

├── actions

└── reducers

```jsx:containers/TodoApp.js
import { connect } from 'react-redux';
import TodoApp from '../components/TodoApp';
import { inputTask, addTask } from '../actions/tasks';

const mapStateToProps = ({ task, tasks }) => {
    return {
        task, // Inputに入力されたタスク
        tasks, // タスクの配列
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // タスクを追加する関数
        addTask(task) {
            dispatch(addTask(task));
        },
        //　タスクを入力する関数
        inputTask(task) {
            dispatch(inputTask(task));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
```

task　Inputに入力されたタスク
tasks　タスクの配列
addTask　タスクを追加する関数
inputTask　タスクを入力する関数

上記4点、propsで受け渡している

他修正

```jsx:components/TodoApp.js
import React from 'react';

const TodoApp = ({ task, tasks, inputTask, addTask }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Please Input"
                onChange={(e) => inputTask(e.target.value)}
            />
            <input
                type="button"
                value="add"
                onClick={ () => addTask(task) }
            />
            <ul>
                {tasks.map((item, i) => {
                    return <li key={i}>{item}</li>;
                })}
            </ul>
        </div>
    );
}

export default TodoApp;
```

```jsx:index.js
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; // 追加
import tasksReducer from './reducers/tasks';
import TodoApp from './containers/TodoApp'; // 変更

// ReducerをStateに登録
const store = createStore(tasksReducer);

// 最終htmlに集約
const renderApp = (store) => {
  render(
    // Providerでラップ
    <Provider store={store}>
      <TodoApp />
    </Provider>,
    document.getElementById('root')
  );
}

store.subscribe(() => renderApp(store));
renderApp(store);
```

# ルーティング

react-routerインストール

```bash
$ npm install --save react-router-dom
```

```jsx:index.js
// 追加
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// ...省略

const renderApp = (store) => {
  render(
    <Provider store={store}>
      <Router>
        <Route path="/" component={ App } />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}

// ...省略
```

## Route
Routeにexactをつけることでpathが完全一致した時のみ
そのコンポーネントが描画されます。

```jsx:index.js
<Router>
  <Route exact path="/" component={ App } />
  <Route exact path="/todo" component={ TodoApp } />
  <Route exact path="/todo/:id" component={ TodoApp } />
</Router>
```
※「:id」はどんな文字列でも描画される

リンクタグ

```jsx:App.js 
import { Link } from 'react-router-dom';

<div className="App">
  <Link to="./todo" className="link">Todo</Link> 
</div>
```


# react-router-redux導入

```bash
$ npm install --save react-router-dom history react-router-redux@next
$ npm install --save connected-react-router
```

```js:store/index.js
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
```

```jsx:index.js
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
```

```js:containers/TodoApp.js
// 省略

const mapStateToProps = ({ tasks }) => {
    return {
        task: tasks.task,
        tasks: tasks.tasks
    };
}

// 省略
```