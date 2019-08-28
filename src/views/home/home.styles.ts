import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledHome = styled(motion.div)`

  height: 100%;
  background-color: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  h1 {
    font-size: ${p => p.theme.fontSizes.display};
  }
  .buttons-wrap {
    a {
      display: inline-block;
      color: ${p => p.theme.colors.white};
      &:first-child {
        margin-right: 16px;
      }
    }
  }
`;

export default StyledHome;