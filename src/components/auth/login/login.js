import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { connect } from 'react-redux'

import * as actions from '../../../store/actions'
import { NavLink } from 'react-router-dom';

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

const Recover = styled.div`
    font-size: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & a {
        align-self: center;
        text-decoration: none;
        margin-left: 3px;
    }
`;

const LoginScheme = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('The email is required'),
    password: Yup.string()
        .required('The password is required')
        .min(8, 'Too short password')
});

const Login = ({loading, error, login, cleanUp}) => {
    useEffect(() => {
        //when mounts
        
        //when unmounts
        return() => {
            cleanUp();
        }
    },[cleanUp])
    return(
        <LoginContainer>
        <Formik 
            initialValues={{email: '', password: ''}} 
            validationSchema={LoginScheme} 
            // onSubmit={async (values, {setSubmitting}) =>{ //this is causing an error: Can't perform a React state update on an unmounted component.This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
            //     await login(values);
            //     setSubmitting(false)
            // }}>
            onSubmit={ (values, {setSubmitting}) =>{
                login(values);
                setSubmitting(false)
            }}>
            {({isSubmitting, isValid}) => (
                <FormWrapper>
                    <p>Login</p>    
                    <Form>
                        <div style={{display: 'flex', flexDirection: 'column', height: '40px'}}>
                            <Field type='email' name='email' placeholder='Your email..'/>
                            <ErrorMessage name='email'/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', height: '40px'}}>
                            <Field type='password' name='password' placeholder='Your password...'/>
                            <ErrorMessage name='password'/>
                        </div>
                        <div style={{display: 'flex'}}>
                            <button disabled={!isValid || isSubmitting} type='submit'>{loading ? 'Loggin in...' :'Login'}</button>
                            <Recover>
                                <NavLink to='/todos-locos/recover-password'>Recover password</NavLink>
                            </Recover>
                        </div>
                        
                        {error && <p style={{ backgroundColor: 'red', color: 'white'}}>{error}</p>}
                    </Form>
                </FormWrapper>
            )}
        </Formik>
        </LoginContainer>
    )
}

const mapStateToProps = ({auth}) => ({
    loading: auth.loading,
    error: auth.error
})

const mapDispatchToProps = {
    login: actions.signIn,
    cleanUp: actions.clean
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
