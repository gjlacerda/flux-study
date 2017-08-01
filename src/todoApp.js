import React from 'react';
import store from 'store';

let nextTodoId = 0;

const FilterLink = ({filter, currentFilter, children}) => {

    if (filter === currentFilter) {
        return <span>{children}</span>;
    }

    return (
        <a href="#" onClick={event => {
            event.preventDefault();
            store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter
            });
        }}>
            {children}
        </a>
    );
};

const getVisibleTodos = (todos, filter) => {

    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
    }

};

export default class TodoApp extends React.Component {

    render() {

        const {todos, visibilityFilter} = this.props;

        const visibleTodos = getVisibleTodos(
            todos,
            visibilityFilter
        );

        return (
            <div>
                <input type="text" ref={node => this.input = node}/>
                <button onClick={this.addTodo.bind(this)}>
                    Add Todo
                </button>
                <ul>
                    {visibleTodos.map(todo =>
                        <li key={todo.id} onClick={this.toggleTodo.bind(this, todo)}
                            style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
                            {todo.text}
                        </li>
                    )}
                </ul>
                <p>
                    Show:&nbsp;
                    <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter}>All</FilterLink>&nbsp;
                    <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter}>Active</FilterLink>&nbsp;
                    <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}>Completed</FilterLink>
                </p>
            </div>
        );
    }

    addTodo() {

        store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
        });

        this.input.value = '';
    }

    toggleTodo(todo) {

        store.dispatch({
            type: 'TOGGLE_TODO',
            id: todo.id
        });
    }
}