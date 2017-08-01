import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from 'todoApp';
import store from 'store';

const render = () => {
    ReactDOM.render(
        <TodoApp {...store.getState()}/>,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();