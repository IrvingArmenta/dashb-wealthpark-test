import { Classes, HTMLTable } from '@blueprintjs/core';
import styled from 'styled-components';

const Table = styled(HTMLTable)`
  &.${Classes.HTML_TABLE} {
    width: 100%;
  }
`;

Table.defaultProps = {
  striped: true
}

export default Table;