import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

let nextTodoId = 0;

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

const Link = ({active, children, onClick}) => {

    if (active) {
        return <span>{children}</span>;
    }

    return (
        <a href="#" onClick={event => {
            event.preventDefault();
            onClick();
        }}>
            {children}
        </a>
    );
};

class FilterLink extends Component {

    componentDidMount() {

        const {store} = this.context;

        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        const props   = this.props;
        const {store} = this.context;
        const state   = store.getState();

        return (
            <Link active={props.filter === state.visibilityFilter}
                  onClick={() => {
                      store.dispatch({
                          type: 'SET_VISIBILITY_FILTER',
                          filter: props.filter
                      });
                  }}>
                {props.children}
            </Link>
        );
    }
}

FilterLink.contextTypes = {
    store: PropTypes.object
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

const AddTodo = (props, {store}) => {

    let input;

    return (
        <div>
            <input type="text" ref={node => input = node}/>
            <button onClick={() => {
                store.dispatch({
                    type: 'ADD_TODO',
                    id: nextTodoId++,
                    text: input.value
                });
                input.value = '';
            }}>
                Add Todo
            </button>
        </div>
    );
};

AddTodo.contextTypes = {
    store: PropTypes.object
};

const Footer = () => (
    <p>
        Show:&nbsp;
        <FilterLink filter='SHOW_ALL'>All</FilterLink>&nbsp;
        <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>&nbsp;
        <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
    </p>
);

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: id => {
            dispatch({
                type: 'TOGGLE_TODO',
                id
            });
        }
    };
};

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

const TodoApp = () => (
    <div>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
    </div>
);

export default TodoApp;