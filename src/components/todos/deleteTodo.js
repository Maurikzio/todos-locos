import React from 'react';
import Modal from '../modal/modal'
import styled from 'styled-components';
import * as actions from '../../store/actions'
import { connect } from 'react-redux';

const Controls = styled.div`
    margin-top: 10px;
    display: flex;
`;
const TodoWrapper = styled.div`
    padding: 10px 5px;
    font-weight: 800;
`;

const DeleteTodo = ({ show, close, todo, error, loading, deleteTodo}) => {
    return(
        <div>
            <Modal opened={show} close={close}>
                <h1>Do you want to delete this ToDo?</h1>
                <TodoWrapper>
                    {todo.todo}
                </TodoWrapper>
                <Controls>
                    <button onClick={() => deleteTodo(todo.id)}>{loading ? 'Deleting...' : 'Delete'}</button>
                    <button onClick={close}>Cancel</button>
                </Controls>
                {error && <p style={{ backgroundColor: 'red', color: 'white'}}>{error}</p>}
            </Modal>
        </div>
    )
}

const mapStateToProps = ({todos}) => ({
    error: todos.deleteTodo.error,
    loading: todos.deleteTodo.loading
})

const mapDispatchToProps = {
    deleteTodo: actions.deleteTodo
}

export default connect(mapStateToProps, mapDispatchToProps )(DeleteTodo);