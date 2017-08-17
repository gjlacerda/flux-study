import React, {Component} from 'react';

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

        const {store} = this.props;

        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        const props   = this.props;
        const {store} = props;
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

const AddTodo = ({store}) => {

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

const Footer = ({store}) => (
    <p>
        Show:&nbsp;
        <FilterLink filter='SHOW_ALL' store={store}>All</FilterLink>&nbsp;
        <FilterLink filter='SHOW_ACTIVE' store={store}>Active</FilterLink>&nbsp;
        <FilterLink filter='SHOW_COMPLETED' store={store}>Completed</FilterLink>
    </p>
);

class VisibleTodoList extends Component {

    componentDidMount() {

        const {store} = this.props;

        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        const props   = this.props;
        const {store} = props;
        const state   = store.getState();

        return (
            <TodoList
                todos={
                    getVisibleTodos(
                        state.todos,
                        state.visibilityFilter
                    )
                }
                onTodoClick={id =>
                    store.dispatch({
                        type: 'TOGGLE_TODO',
                        id
                    })}
            />
        );
    }
}

const TodoApp = ({store}) => (
    <div>
        <AddTodo store={store}/>
        <VisibleTodoList store={store}/>
        <Footer store={store}/>
    </div>
);

export default TodoApp;