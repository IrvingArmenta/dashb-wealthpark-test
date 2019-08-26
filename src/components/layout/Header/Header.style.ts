import { readableColor } from 'polished';
import styled from 'styled-components';
import { pxToRem } from '../../../global-styles/GlobalStyle';

const StyledHeader = styled.header`
  min-height: ${pxToRem('45px')};
  background-color: ${p => p.theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${p => p.theme.spacing[2]};

  h2 {
    margin-bottom: 0;
    color: ${p => readableColor(p.theme.colors.primary)};
    a {
      color: ${p => readableColor(p.theme.colors.primary)};
    }
  }

  .header__section {
    flex: 1;
    &.right {
      text-align: right;
    }
  }
`;

export default StyledHeader;
