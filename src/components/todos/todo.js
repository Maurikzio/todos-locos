import React, {useState} from 'react';
import styled from 'styled-components';
import DeleteTodo from '../todos/deleteTodo'

const Wrapper = styled.div`
    width: 300px;
    /* background-color: yellow; */
    position: relative;
    border: 1px solid black;
    padding: 10px 20px 20px;
    margin: 5px 0px;
    text-align: center;
    p{
        /* font-family: 'Arial'; */
        font-size: 20px;
        /* font-weight: 100; */
        
    }
`;

const Controls = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    /* padding: 5px 0; */
    cursor: pointer;
    i {
        color: rgb(248, 248, 250);
    }
    i:hover{
        color: yellow;
    }
`;

const editStyles = {
    background: 'rgba(0, 200, 0, 1)',
    // color: 'rgb(248, 248, 250)',
    flexGrow: '1',
    padding: '5px 0',
};

const deleteStyles = {
    background: 'rgba(230, 0, 0, 1)',
    // color: 'orange',
    flexGrow: '1',
    // color: 'rgb(248, 248, 250)',
    padding: '5px 0',
}


const Todo = ({todo}) => {
    const [isDeleting, setIsDeleting ] = useState(false)
    return(
        <Wrapper>
            <p>{todo.todo}</p>
            <Controls>
            <i className="far fa-edit" style={editStyles}/>
            <i className="far fa-trash-alt" style={deleteStyles} onClick={() => setIsDeleting(true)}/>
            <DeleteTodo 
                show={isDeleting} 
                close={() => setIsDeleting(false)} 
                todo={todo}    
            />
            </Controls>
        </Wrapper>
    )
}

export default Todo;