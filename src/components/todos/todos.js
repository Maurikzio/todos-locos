import React from 'react';
import styled from 'styled-components';
import { useFirestoreConnect } from 'react-redux-firebase';
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

const Todos = () => {   

    const todoId = 'Qkw18cnqIKPnugsRwdcYqfogiAp1';

    useFirestoreConnect(() => [
        { collection: 'todos', doc: todoId } // or `todos/${props.todoId}`
      ])
    const myTodos = useSelector(({ firestore: { data } }) => data.todos && data.todos[todoId].todos)
    const ting = useSelector(({firestore: { status }}) => status.requesting[`todos/${todoId}`])
    const ted = useSelector(({firestore: { status }}) => status.requested[`todos/${todoId}`])
    // useFirestoreConnect(() => [{collection: 'todos', doc: userId}])
    // const myTodos = useSelector( ({ firestore: {data} }) =>  data.todos &&  data.todos[userId].todos)

    // console.log(requesting)
    // console.log(myTodos);
    // console.log(ting);
    // console.log(ted);

    let content;
    if(!myTodos){
        content = <Loader/>
    }else if(!myTodos && ted){
        content = <p>You have no todos</p>
    }else{
        content = myTodos.map( todo => <Todo key={todo.id} todo={todo}/>)
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
}

// const mapStateToProps = ({ firebase, firestore }) => ({
//     userId: firebase.auth.uid,
//     todos: firestore.data.todos,
//     requesting: firestore.status.requesting,
//     requested: firestore.status.requested
// })

// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect(props => [`todos/${props.userId}`])
// )(Todos);

// export default connect(mapStateToProps)(Todos);
export default Todos;


// export default compose(
//     firestoreConnect((props) => [
//       { collection: 'todos', doc: props.todoId } // or `todos/${props.todoId}`
//     ]),
//     connect(({ firestore: { data } }, props) => ({
//       todos: data.todos && data.todos[todoId]
//     }))
//    )(SomeComponent)