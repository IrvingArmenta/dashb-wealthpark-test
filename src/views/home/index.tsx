import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import StyledHome from './home.styles';

const Home = (props: RouteComponentProps) => {
  return (
    <StyledHome>
      <h1>DashB</h1>
      <div className="buttons-wrap">
      <a href="/login">Login</a>
      <a href="/signup">Sign Up</a>
      </div>
    </StyledHome>
  )
}

export default withRouter(Home);