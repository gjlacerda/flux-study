import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from 'todoApp';
import reducer from './reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={createStore(reducer)}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);