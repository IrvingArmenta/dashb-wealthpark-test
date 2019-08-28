import { motion } from 'framer-motion';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

class MainLayout extends PureComponent<{animate: any, initial: any, exit: any}> {
  public render() {
    return (
      <StyledLayoutContainer className="app" 
      animate={this.props.animate} 
      initial={this.props.initial} 
      exit={this.props.exit}>
        {this.props.children}
      </StyledLayoutContainer>
    );
  }
}

const StyledLayoutContainer = styled(motion.div)`
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
