import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const LoginContainer = styled.div`
    /* background-color: red; */
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const FormWrapper = styled.div`
    border-radius: 10px;
    box-shadow: 0 5px 5px rgba(255, 165, 0,  .5);
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 500px;
`;

const LoginScheme = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('The email is required'),
    password: Yup.string()
        .required('The password is required')
});

const Login = () => {
    return(
        <LoginContainer>
        <Formik initialValues={{email: '', password: ''}} validationSchema={LoginScheme} onSubmit={(values, {setSubmitting}) => console.log(values)}>
            {({isSubmitting, isValid}) => (
                <FormWrapper>
                    <p>Login</p>    
                    <Form>
                        <div style={{display: 'flex', flexDirection: 'column', height: '40px'}}>
                            <Field type='email' name='email' placeholder='Your email..'/>
                            <ErrorMessage name='email'/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', height: '40px'}}>
                            <Field type='passowrd' name='password' placeholder='Your password...'/>
                            <ErrorMessage name='password'/>
                        </div>
                        <button disabled={!isValid} type='submit'>Submit</button>
                    </Form>
                </FormWrapper>
            )}
        </Formik>
        </LoginContainer>
    )
}

export default Login;
