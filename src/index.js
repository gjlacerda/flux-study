import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from 'todoApp';
import reducer from './reducer';
import {createStore} from 'redux';
import PropTypes from 'prop-types';

class Provider extends React.Component {

    getChildContext() {
        return {
            store: this.props.store
        };
    }

    render() {
        return this.props.children;
    }
}

Provider.childContextTypes = {
    store: PropTypes.object
};

ReactDOM.render(
    <Provider store={createStore(reducer)}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);