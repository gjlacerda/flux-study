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

const Todo = ({onClick, completed, text}) => (
    <li onClick={onClick}
        style={{textDecoration: completed ? 'line-through' : 'none'}}>
        {text}
    </li>
);

const TodoList = ({todos, onTodoClick}) => (
    <ul>
        {todos.map(todo =>
            <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)}/>
        )}
    </ul>
);

export default class TodoApp extends React.Component {

    render() {

        const {todos, visibilityFilter} = this.props;

        const visibleTodos = this.getVisibleTodos(
            todos,
            visibilityFilter
        );

        return (
            <div>
                <input type="text" ref={node => this.input = node}/>
                <button onClick={this.addTodo.bind(this)}>
                    Add Todo
                </button>
                <TodoList todos={visibleTodos} onTodoClick={id => this.toggleTodo(id)}/>
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

    toggleTodo(id) {

        store.dispatch({
            type: 'TOGGLE_TODO',
            id: id
        });
    }

    getVisibleTodos(todos, filter) {

        switch (filter) {
            case 'SHOW_ALL':
                return todos;
            case 'SHOW_COMPLETED':
                return todos.filter(t => t.completed);
            case 'SHOW_ACTIVE':
                return todos.filter(t => !t.completed);
        }
    }
}