import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '../../components/layout/Box';
import CenteredLayout from '../../components/layout/CenteredLayout';
import Header from '../../components/layout/Header';
import SignUpForm from './sign-up-form';

class SignIn extends PureComponent {
  public render() {
    return (
      <CenteredLayout>
        <Header logoLink={true} />
        <Box borderRadius={true} width="400px">
          <header className="box__header">
            <h2 className="box__title">Sign Up</h2>
          </header>
          <SignUpForm />
          <div className="box__bottom">
            <p>Already have an account?</p>
            <Link to="/login" >Go to login screen</Link>
          </div>
        </Box>
      </CenteredLayout>
    )
  }
}


export default SignIn;