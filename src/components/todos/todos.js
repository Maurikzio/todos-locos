import React, {useEffect} from 'react';
import styled from 'styled-components';
import { firestoreConnect, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux'
import { compose } from 'redux'

import AddTodo from './addTodo';
import Loader from '../../components/loader/loader';
import Todo from './todo';

const TodosWrapper = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    h1{
        text-align: center;
    }

`;
const TodosContainer = styled.div`
    /* background-color: green; */
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// const Todos = ({ todos, requested, userId }) => {   

const Todos = React.memo(({ todos, requested, userId }) => {

    /*
    // const todoId = 'Qkw18cnqIKPnugsRwdcYqfogiAp1';
    const todoId = useSelector(state => state.firebase.auth.uid);

    useFirestoreConnect(() => [
        { collection: 'todos', doc: todoId } // or `todos/${props.todoId}`
        ])
    const myTodos = useSelector(({ firestore: { data } }) => data.todos && data.todos[todoId].todos)
    // const requesting = useSelector(({firestore: { status }}) => status.requesting[`todos/${todoId}`])
    const requested = useSelector(({firestore: { status }}) => status.requested[`todos/${todoId}`])
    // useFirestoreConnect(() => [{collection: 'todos', doc: userId}])
    // const myTodos = useSelector( ({ firestore: {data} }) =>  data.todos &&  data.todos[userId].todos)
    */
    
    let content;
    // if(!myTodos){
    //     content = <Loader/>
    // }else if(!myTodos && requested){
    //     content = <p>You have no todos!</p>
    // }else if(myTodos.length === 0){
    //     content = <p>You have no todos!</p>
    // }else {
    //     content = myTodos.slice().reverse().map( todo => <Todo key={todo.id} todo={todo}/>) 
    // }

        if(!todos){
            content = <Loader/>
        }else if((!todos[userId] && requested[`todos/${userId}`] || todos[userId].todos.length === 0)){ 
            content = <p>You have no todos!</p>
        // }else if(todos[userId].todos.length === 0){
        //     content = <p>You have no todos!</p>
        }else {
            content = todos[userId].todos.slice(0).reverse().map( todo => <Todo key={todo.id} todo={todo}/>) 
        }

    
/*
    if(!todos){
        content = <Loader/>
    }else if(!todos[userId] && requested[`todos/${userId}`]){
        content = <p>'You have no todos'</p>;
    }else{
        content = todos[userId].todos.map(todo => <Todo key={todo.id} todo={todo}/>)
        content = myTodos.map(todo => <Todo key={todo.id} todo={todo}/>)
    }
*/

    return (
        <TodosWrapper>
            <h1>Your ToDos</h1>
            <TodosContainer>
                <AddTodo/>
                {content}
            </TodosContainer>
        </TodosWrapper>
    )
})

// const mapStateToProps = ({ firebase, firestore }) => ({
//     userId: firebase.auth.uid,
//     todos: firestore.data.todos,
//     requesting: firestore.status.requesting,
//     requested: firestore.status.requested
// });

// const mapDispatchToProps = {};

export default compose(
    // firestoreConnect(props => [`todos/${props.userId}`]),
    // connect(mapStateToProps,
    //     mapDispatchToProps
    //     )
    connect((state) => ({
        userId: state.firebase.auth.uid,
        todos: state.firestore.data.todos,
        requested: state.firestore.status.requested
      })),
      firestoreConnect(props => [`todos/${props.userId}`]),
)(Todos);

// export default connect(mapStateToProps)(Todos);
// export default Todos;


// export default compose(
//     firestoreConnect((props) => [
//       { collection: 'todos', doc: props.todoId } // or `todos/${props.todoId}`
//     ]),
//     connect(({ firestore: { data } }, props) => ({
//       todos: data.todos && data.todos[todoId]
//     }))
//    )(SomeComponent)