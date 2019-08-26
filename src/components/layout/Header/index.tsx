import { Alert, Button} from '@blueprintjs/core';
import React, { Component } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { LStorage } from '../../../api/localstorageHelpers';
import StyledHeader from './Header.style';

interface HeaderProps {
  logoLink?: boolean;
  isLogged?: boolean;
}

interface HeaderState {
  modalIsOpen: boolean;
}

class Header extends Component<HeaderProps & RouteComponentProps, HeaderState> {

  constructor(props: HeaderProps & RouteComponentProps) {
    super(props);
    this.state = {
      modalIsOpen: false,
    }
  }

  public toggleModal = () => {
    this.setState(prvState => ({
      modalIsOpen: !prvState.modalIsOpen
    }))
  }

  public render() {
    const isLoggedIn = LStorage.getAuthToken();
    return (
      <StyledHeader className="header">
        <section className="header__section">
          <h2>{this.props.logoLink ? <Link to="/dashboard">DashB</Link> : 'DashB'}</h2>
        </section>
        <section className="header__section right">
          {isLoggedIn ?
            <span>
              <Button aria-label="logout" onClick={this.toggleModal}>
                Logout
          </Button>
            </span> :
            <span>
              <Button aria-label="Go to login page" onClick={() => this.props.history.push('/login')}>
                Login
            </Button>
            </span>
          }
        </section>
        <Alert cancelButtonText="No" 
        onCancel={this.toggleModal} 
        isOpen={this.state.modalIsOpen} 
        confirmButtonText="Yes"
         onConfirm={() => {
          LStorage.logOutAndClearData();
          this.props.history.push('/', {
            loggedOut: true
          });
        }} ><p>Are you sure you want to logout?</p></Alert>
      </StyledHeader>
    );
  }


}

// LStorage.logOutAndClearToken();
// this.props.history.replace('/login');

export default withRouter(Header);
