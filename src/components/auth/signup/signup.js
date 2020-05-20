import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions'


const SignupContainer = styled.div`
    /* background-color: red; */
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const FormWrapper = styled.div`
    border-radius: 10px;
    box-shadow: 0 5px 5px rgba(255, 165, 0,  .5);
    padding: 30px 60px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 500px;
    text-align: center;
`;

const SignupScheme = Yup.object().shape({
    firstName: Yup.string()
        .required('First name is required')
        .min(3, 'Too short')
        .max(25, 'Too long'),
    lastName: Yup.string()
        .required('Last name is required')
        .min(3, 'Too short')
        .max(25, 'Too long'),
    email: Yup.string()
        .email('Invalid email')
        .required('The email is required'),
    password: Yup.string()
        .required('The password is required')
        .min(8, 'The password is too short'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password doesnt match')
        .required('You need to confirm your password')
});

const Signup = ({ signUp }) => {
    return(
        <SignupContainer>
        <Formik 
            initialValues={{
                firstName: '',
                lastName: '',
                email: '', 
                password: '',
                confirmPassword: ''
            }} 
            validationSchema={SignupScheme} 
            onSubmit={(values, {setSubmitting}) => {
                console.log(values)
                signUp(values);
                setSubmitting(false);
            }}>
            {({isSubmitting, isValid}) => (
                <FormWrapper>
                    <p>Sign up</p>
                    <Form>
                        <div style={{display: 'flex', flexDirection: 'column', height: '40px', width: '100%'}}>
                            <Field type='text' name='firstName' placeholder='Your first name..'/>
                            <ErrorMessage name='firstName'/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', height: '40px'}}>
                            <Field type='text' name='lastName' placeholder='Your last name..'/>
                            <ErrorMessage name='lastName'/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', height: '40px'}}>
                            <Field type='email' name='email' placeholder='Your email..'/>
                            <ErrorMessage name='email'/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', height: '40px'}}>
                            <Field type='password' name='password' placeholder='Your password...'/>
                            <ErrorMessage name='password'/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', height: '40px'}}>
                            <Field type='password' name='confirmPassword' placeholder='Confirm password...'/>
                            <ErrorMessage name='confirmPassword'/>
                        </div>
                        <button disabled={!isValid} type='submit'>Submit</button>
                    </Form>
                </FormWrapper>
            )}
        </Formik>
        </SignupContainer>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    signUp: actions.signUp
} 

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
