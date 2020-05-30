import React, {useState} from 'react';
import styled from 'styled-components';
import DeleteTodo from '../todos/deleteTodo'
import EditTodo from './editTodo';

import * as actions from '../../store/actions'
import { connect, useSelector } from 'react-redux';
import EditingLoader from '../loader/editingLoader';


const Wrapper = styled.div`
    width: 300px;
    position: relative;
    border: 1px solid black;
    margin: 5px 0px;
    text-align: center;
`;

const Controls = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    cursor: pointer;
    i {
        color: rgb(248, 248, 250);
    }
    i:hover{
        color: yellow;
    }
`;

const TodoContent = styled.div`
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
        margin: 0px 0px;
        font-size: 20px;
    }
`;

const editStyles = {
    background: 'rgba(0, 200, 0, 1)',
    flexGrow: '1',
    padding: '5px 0',
};

const deleteStyles = {
    background: 'rgba(230, 0, 0, 1)',
    flexGrow: '1',
    padding: '5px 0',
};



const Todo = ({todo, modifyTodo}) => {
    const [ isDeleting, setIsDeleting ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editedTodo, setEditedTodo ] = useState(todo.todo);

    const loading = useSelector(state => state.todos.editTodo.loading)

    const itsMe = () => {
        console.log(todo.todo)
    }
    
    return(
        // <Wrapper onMouseLeave={() => setIsEditing(false)}>
        <Wrapper> 
            <TodoContent>
                {   
                    (isEditing) ? (loading ? <EditingLoader/> : <EditTodo toEdit={setEditedTodo} todo={todo}/>) : <p>{todo.todo}</p>
                }
            </TodoContent>    
            <Controls>
                {
                    isEditing 
                    ? <><i className="fas fa-check" style={editStyles} onClick={ async () => { await modifyTodo(todo.id, editedTodo); setIsEditing(false)}}/> <i className="fas fa-times" style={deleteStyles} onClick={() => setIsEditing(false)}/></>
                    : <><i className="far fa-edit" style={editStyles} onClick={()=>setIsEditing(true)}/> <i className="far fa-trash-alt" style={deleteStyles} onClick={() => setIsDeleting(true)}/></>
                }
                <DeleteTodo 
                    show={isDeleting} 
                    close={() => setIsDeleting(false)} 
                    todo={todo}    
                />
            </Controls>
        </Wrapper>
    )
}

const mapDispatchToProps = {
    modifyTodo: actions.editTodo
}

export default connect(null, mapDispatchToProps)(Todo);
