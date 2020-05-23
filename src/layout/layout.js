import React from 'react';
import styled from 'styled-components'
import Navbar from '../components/navbar/navbar';

import { connect } from 'react-redux';
import Loader from '../components/loader/loader';

const MainWrapper = styled.div`
    width: 100%;
    margin-top: 60px;
    height: 100%;
`

const LoaderContainer = styled.div`
    height: calc(100% + 60px);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Layout = ({ children, loggedIn, authIsLoaded }) => {
    // console.log(children);
    // console.log(`is logged in: ${JSON.stringify(loggedIn,null, 2)}`);
    // console.log(`is loaded: ${authIsLoaded}`);
    if(!authIsLoaded) return <LoaderContainer><Loader/></LoaderContainer>
    return (
        <React.Fragment>
            <Navbar loggedIn={loggedIn}/>
            <MainWrapper>{children}</MainWrapper>
        </React.Fragment>
    )
};

const mapStateToProps = ({firebase}) => ({
    loggedIn: firebase.auth,
    authIsLoaded: firebase.auth.isLoaded
})

export default connect(mapStateToProps)(Layout);