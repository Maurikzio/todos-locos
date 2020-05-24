import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

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

const ProfileScheme = Yup.object().shape({
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
    password: Yup.string().min(8, 'The password is too short'),
    confirmPassword: Yup.string().when('password', {
        is: password => password > 0,
        then: Yup.string()
            .required('You need to confirm your password')
            .oneOf([Yup.ref('password'), null], 'Password doesnt match')
    })
});
// console.log(ProfileScheme);

const Profile = ({ firebase, loading, error,  editProfile, cleanUp}) => {

    useEffect(() => {
        return () => {
            cleanUp();
        };
    }, [cleanUp])

    if(!firebase.profile.isLoaded) return null;
    return (
        <SignupContainer>
            <Formik 
                initialValues={{
                    firstName: firebase.profile.firstName,
                    lastName: firebase.profile.lastName,
                    email: firebase.auth.email, 
                    password: '',
                    confirmPassword: ''
                }} 
                validationSchema={ProfileScheme} 
                // onSubmit={async (values, {setSubmitting}) => {
                //     console.log(values);
                //     await signUp(values);
                //     setSubmitting(false);
                // }}>
                //error: Can't perform a React state update on an unmounted component. 
                onSubmit={(values, {setSubmitting}) => {
                    // edit profile here
                    // console.log(values)
                    editProfile(values);
                    setSubmitting(false);
                }}>
                {({isSubmitting, isValid}) => (
                    <FormWrapper>
                        <p>Edit Profile</p>
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
                            <button disabled={!isValid || isSubmitting} type='submit'>{loading ? 'Editing...' :'Submit'}</button>
                            {/* {error && <p style={{ backgroundColor: 'red', color: 'white'}}>{error}</p>} */}
                            {!error 
                            ? error === false ? <p>Edit profile succesfully</p> : <p style={{ backgroundColor: 'red', color: 'white'}}>{error}</p> 
                            : <p>{error}</p>
                        }
                        </Form>
                    </FormWrapper>
                )}
            </Formik>
        </SignupContainer>
    )
}

const mapStateToProps = ({ firebase, auth}) => ({
    firebase,
    loading: auth.profileEdit.loading,
    error: auth.profileEdit.error
})

const mapDispatchToProps = {
    editProfile: actions.editProfile,
    cleanUp: actions.clean
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)