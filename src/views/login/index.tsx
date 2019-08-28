import React, { PureComponent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { LStorage } from '../../api/localstorageHelpers';
import { Box } from '../../components/layout/Box';
import CenteredLayout from '../../components/layout/CenteredLayout';
import Header from '../../components/layout/Header';
import LoginForm from './login-form';

class Login extends PureComponent<RouteComponentProps> {
  
  public componentDidMount = () => {
    if (LStorage.getAuthToken()) {
      this.props.history.replace('/dashboard');
      return;
    }
  }

  public render() {
    return (
      <CenteredLayout>
        <Header logoLink={true} />
        <Box borderRadius={true} width="400px">
          <header className="box__header">
            <h2 className="box__title">Login</h2>
          </header>
          <LoginForm />
          <div className="box__bottom">
            <p>No account?</p>
            <Link to="/signup" >Signup for new account</Link>
          </div>
        </Box>
      </CenteredLayout>
    )
  }
}

export default withRouter(Login);