import {createStore, combineReducers} from 'redux';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const todo = (state, action) => {

    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id === action.id) {
                return Object.assign({}, state, {
                    completed: !action.completed
                });
            }

            return state;
        default:
            return state;
    }

};

const todos = (state = [], action) => {

    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }

};

const testAddTodo = () => {

    const stateBefore = [];
    const action      = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter  = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

const testToggleTodo = () => {

    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }, {
            id: 1,
            text: 'Go shopping',
            completed: false
        }
    ];
    const action      = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    const stateAfter  = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }, {
            id: 1,
            text: 'Go shopping',
            completed: true
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);

};

const visibilityFilter = (state = 'SHOW_ALL', action) => {

    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

//const todoApp = (state = {}, action) => {
//
//    return {
//        todos: todos(state.todos, action),
//        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//    };
//};

// Dá no mesmo que o código comentado a cima
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

testAddTodo();
testToggleTodo();

console.log('All tests passed.');

const store = createStore(todoApp);

export default store;