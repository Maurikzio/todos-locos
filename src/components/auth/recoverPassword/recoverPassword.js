import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

const RecoverSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('The email is required')
});

const RecoverContainer = styled.div`
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

const RecoverPassword = ({loading, error, recoverPassword}) => {
    // console.log(error);
    return(
        <RecoverContainer>
            <Formik
                initialValues={{ email: '' }}
                validationSchema = {RecoverSchema}
                onSubmit={(values, {setSubmitting}) => {
                    // console.log('Send email to recover')
                    recoverPassword(values)
                    setSubmitting(false)
                }}
            >
            {({isSubmitting, isValid}) => (
                <FormWrapper>
                    <h2>Recover password</h2>
                    <Form>
                        <div style={{display: 'flex', flexDirection: 'column', height: '40px', width: '100%'}}>
                            <Field type='email' name='email' placeholder='Enter email...'/>
                            <ErrorMessage name='email'/>
                        </div>
                        <button disabled={!isValid || isSubmitting} type='submit'>{loading ? 'Sending recover email..' :'Recover email'}</button>
                        {!error 
                            ? error === false ? <p>Recover email sent succesfully</p> : <p>{error}</p> 
                            : <p>{error}</p>
                        }
                    </Form>
                </FormWrapper>
            )}
            </Formik>
        </RecoverContainer>
    )
}

const  mapStateToProps = ({ auth }) => ({
    loading: auth.recoverPassword.loading,
    error: auth.recoverPassword.error,
})

const mapDispatchToProps = {
    recoverPassword: actions.recoverPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);