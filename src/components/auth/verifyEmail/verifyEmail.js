import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions'

const VerifyEmail = ({ error, loading, sendVerification, cleanUp }) => {
    // console.log(error);
    useEffect(() => {
        //when component mounts

        return () => { //when component unmounts
            cleanUp()
        }
    }, [cleanUp])
    return(
        <div>
        <h2>You are not verified...</h2>
        <p>Go to your mail inbox and pls verify the email..</p>
        <button disabled={loading} onClick={sendVerification}>{ loading ? "Sending email..." : "Re-send verification email..."}</button>
        {!error 
            ? error === false ? <p>Message sent succesfully</p> : <p>{error}</p> 
            : <p>{error}</p>
        }
        </div>
    )
}

const mapStateToProps = ({auth}) => ({
    loading: auth.verifyEmail.loading,
    error: auth.verifyEmail.error
})

const mapDispacthToProps = {
    sendVerification: actions.verifyEmail,
    cleanUp: actions.clean
}

export default connect(mapStateToProps, mapDispacthToProps)(VerifyEmail); 