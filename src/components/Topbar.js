import React from 'react';
import { LoginOutlined } from '@ant-design/icons';
import logo from '../assets/logo.svg';
import '../styles/Topbar.css';

export function Topbar(props) {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Around</h1>
            {
                props.isLoggedIn ?
                    <a onClick={props.handleLogout} className="logout">
                        <LoginOutlined type="logout" />
                        {' '}Logout
                    </a> :
                    null
            }
        </header>
    );
}