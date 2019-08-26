import React, { PureComponent } from 'react';
import styled from 'styled-components';
import StyledHeader from './Header/Header.style';

class CenteredLayout extends PureComponent {
  public render() {
    return (
      <StyledLayoutContainer className="app">
        <div>
          {this.props.children}
        </div>
      </StyledLayoutContainer>
    );
  }
}

const StyledLayoutContainer = styled.div<{ bgColor?: string }>`
  ${StyledHeader} {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color: transparent;
      border-bottom: 1px solid ${p => p.theme.colors.grayscale[300]};
  }
  & > div {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${p => p.bgColor || p.theme.colors.grayscale[100]};
  }
`;

export default CenteredLayout;
