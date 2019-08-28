import { Classes } from '@blueprintjs/core';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Table = styled(motion.table)`
  &.${Classes.HTML_TABLE} {
    width: 100%;
    td {
      vertical-align: middle;
    }
  }
`;

Table.defaultProps = {
  className: 'bp3-html-table bp3-html-table-striped'
}

export default Table;