import styled from 'styled-components';

const TableRow = styled.tr<{key: string}>`
  .user {
    &__name {
      font-weight: bold;
    }
  }
`;

export default TableRow;