import styled from 'styled-components';
import { ContentTypes } from '.';
import { pxToRem } from '../../../global-styles/GlobalStyle';

export const StyledContent = styled.main<ContentTypes>`
  padding: ${props => (props.p ? pxToRem(props.p) : '')};
`;

StyledContent.defaultProps = {
  p: '16px',
};
