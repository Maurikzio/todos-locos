import React from 'react';
import Modal from '../modal/modal'
import styled from 'styled-components';

const Controls = styled.div`
    margin-top: 10px;
    display: flex;
`;

const DeleteTodo = ({ show, close, todo}) => {
    return(
        <div>
            <Modal opened={show} close={close}>
                {todo.todo}
                <Controls>
                    <button>Delete</button>
                    <button onClick={close}>Cancel</button>
                </Controls>
            </Modal>
        </div>
    )
}

export default DeleteTodo;