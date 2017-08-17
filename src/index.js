import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from 'todoApp';
import reducer from './reducer';
import {createStore} from 'redux';

ReactDOM.render(
    <TodoApp store={createStore(reducer)}/>,
    document.getElementById('root')
);