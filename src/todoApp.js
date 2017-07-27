import React from 'react';
import store from 'store';

let nextTodoId = 0;

export default class TodoApp extends React.Component {

    render() {

        return (
            <div>
                <input type="text" ref={node => this.input = node}/>
                <button onClick={this.addTodo.bind(this)}>
                    Add Todo
                </button>
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id} onClick={this.toggleTodo.bind(this, todo)}
                            style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
                            {todo.text}
                        </li>
                    )}
                </ul>
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