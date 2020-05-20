import React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.div`
    padding: 10px;
    font-weight: 800;
    display: flex;
    align-items: center;
    flex-grow: 1;
    width: 100%;
`;


const Logo = () => {
    return (
        <LogoWrapper>
            ToDos Locos
        </LogoWrapper>
    )
}

export default Logo;