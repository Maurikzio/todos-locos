import React from 'react';
import styled from 'styled-components'
import Navbar from '../components/navbar/navbar';


const MainWrapper = styled.div`
    width: 100%;
    margin-top: 60px;
`

const Layout = ({ children }) => {
    console.log(children);
    return (
        <React.Fragment>
            <Navbar/>
            <MainWrapper>
                {children} 
            </MainWrapper>
        </React.Fragment>
    )
}

export default Layout;