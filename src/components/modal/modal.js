import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Backdrop from './backdrop/backdrop'

const WrapperModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: ${({opened}) => opened ? 'translate(-50%, -50%)' : 'translate(-50%, -150%)'};
    opacity: ${({opened}) => opened ? '1': '0'};
    visibility: ${({opened}) => opened ? 'visible': 'hidden'};
    width: 100%;
    color: white;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* box-shadow: 0 10px 5px orange; */
    transition: all .5s;
    z-index: 150;
    padding: 40px 30px;
    background-color: orange;
`

// const Modal = ({opened, close, children}) => {
const Modal = React.memo(({opened, close, children}) => {
    return ReactDOM.createPortal(
        <>
        <Backdrop close={close} opened={opened}></Backdrop>
        <WrapperModal opened={opened}>{children}</WrapperModal>
        </>,
        document.getElementById('root-modal')
    );
}, (prevProps, nextProps) => {
    //if it returns false will update the component
    return prevProps.opened === nextProps.opened;
})

export default Modal;