import React, { PureComponent } from 'react';
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
        </Box>
      </CenteredLayout>
    )
  }
}


export default SignIn;