import React from 'react';
import styled from 'styled-components';
import Logo from '../logo/logo';
import { NavLink } from 'react-router-dom';

 
const NavWrapper = styled.div`
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 60px;
    background-color: orange; 
    display: flex;
    padding: 0 20px;
    z-index: 100;
`

const Nav = styled.nav`
    display: flex;
    flex-grow: 1;
    width: 100%;
`;

const NavItems = styled.ul` 
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 0px;
    width: 100%;
    li{
        display: flex;
        padding: 0 15px;
        font-weight: 800;
        a{
            text-decoration: none;
            color: black;
        }
    }
`;

const Navbar = ({ loggedIn }) => {
    let links;
    if(loggedIn.uid){
        links = ( 
            <NavItems>
                {/* <li>
                    <NavLink to="/todos-locos">Home</NavLink>
                </li> */}
                <li>
                    <NavLink to="/todos-locos">Todos</NavLink>
                </li>
                <li>
                    <NavLink to='/todos-locos/profile'>Profile</NavLink>
                </li>
                <li>
                    <NavLink to='/todos-locos/logout'>Logout</NavLink>
                </li>
            </NavItems>
        )
    }else{
        links = (
            <NavItems>
                {/* <li>
                    <NavLink to="/todos-locos">Home</NavLink>
                </li> */}
                {/* <li>
                    <NavLink to="/todos-locos">Todos</NavLink>
                </li> */}
                <li>
                    <NavLink to='/todos-locos/login'>Login</NavLink>
                </li>
                <li>
                    <NavLink to='/todos-locos/signup'>Signup</NavLink>
                </li>
            </NavItems>
        )
    }
    return(
        <NavWrapper>
            <Logo/>
            <Nav>{links}</Nav>
        </NavWrapper>
    )
};

export default Navbar;