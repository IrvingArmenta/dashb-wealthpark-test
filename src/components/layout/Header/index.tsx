import { Button } from '@blueprintjs/core';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { LStorage } from '../../../api/localstorage';
import StyledHeader from './Header.style';

interface HeaderProps {
  logoLink?: boolean;
  isLogged?: boolean;
}

const Header = (props: HeaderProps & RouteComponentProps) => {
  return (
    <StyledHeader className="header">
      <section className="header__section">
        <h2>{props.logoLink ? <Link to="/dashboard">DashB</Link> : 'DashB'}</h2>
      </section>
      <section className="header__section right">
        <span><Button onClick={() => { 
          LStorage.logOutAndClearToken(); 
          props.history.replace('/login');   
        }}>Logout</Button></span>
      </section>
    </StyledHeader>
  );
};

export default withRouter(Header);
