import React from 'react';
import styled from 'styled-components';
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux'
import { compose } from 'redux'

import AddTodo from './addTodo';
import Loader from '../../components/loader/loader';
import Todo from './todo';

const TodosWrapper = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: red; */
`;
const TodosContainer = styled.div`

`;

const Todos = ({userId, todos, requesting, requested}) => {
    
    // useFirestoreConnect(() => [{collection: 'todos', doc: userId}])
    // const myTodos = useSelector(({ firestore: {data} }) => data.todos && data.todos[userId])


    // console.log(todos);

    let content;

    if(!todos){
        content = <Loader/>
    }else if(!todos[userId] && requested[`todos/${userId}`]){
        content = <p>'You have no todos'</p>;
    }else{
        content = todos[userId].todos.map(todo => <Todo key={todo.id} todo={todo}/>)
    }

    return (
        <TodosWrapper>
            <h1>Your ToDos</h1>
            <TodosContainer>
            <AddTodo/>
            {content}
            </TodosContainer>
        </TodosWrapper>
    )
}

const mapStateToProps = ({ firebase, firestore }) => ({
    userId: firebase.auth.uid,
    todos: firestore.data.todos,
    requesting: firestore.status.requesting,
    requested: firestore.status.requested
})

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [`todos/${props.userId}`])
)(Todos);