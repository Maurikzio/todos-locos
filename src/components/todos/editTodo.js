import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const Input = styled.input`
    display: block;
    font-size: 20px;
    margin: 20px 0;
    padding: 0;
    width: 100%;
    text-align: center;
    border: none;

`;

const EditTodo = ({todo, toEdit}) => {
    const [ editTodo, setEditTodo] = useState(todo.todo)

    const handleEditTodo = (e) => {
        setEditTodo(e.target.value);
        toEdit(e.target.value);
    }
    return(
        <Input
            type='text'
            value={editTodo}
            onChange={handleEditTodo}
            autoFocus
        />
    )
}
export default EditTodo;