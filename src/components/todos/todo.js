import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 300px;
    margin: auto;
`;

const Todo = ({todo}) => {
    return(
        <Wrapper>
            <p>{todo.todo}</p>
        </Wrapper>
    )
}

export default Todo;