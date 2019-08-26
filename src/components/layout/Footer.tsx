import { readableColor } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { pxToRem } from '../../global-styles/GlobalStyle';

const Footer = () => {
  return (
    <StyledFooter className="footer">
      <div>Footer</div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.black};
  min-height: ${pxToRem('80px')};
  color: ${props => readableColor(props.theme.colors.black)};
  padding: ${p => p.theme.spacing[2]}
`;

export default Footer;
