import React, { PureComponent } from 'react';
import styled from 'styled-components';

class MainLayout extends PureComponent {
  public render() {
    return (
      <StyledLayoutContainer className="app">
        {this.props.children}
      </StyledLayoutContainer>
    );
  }
}

const StyledLayoutContainer = styled.div`
  .header,
  .footer {
    flex-shrink: 0;
  }

  .main {
    flex-grow: 1;
    position: relative;
  }
`;

export default MainLayout;
