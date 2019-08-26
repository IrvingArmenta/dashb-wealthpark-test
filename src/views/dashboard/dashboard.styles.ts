import styled from 'styled-components';

const TableRow = styled.tr<{key: string}>`
  .user {
    &__name {
      font-weight: bold;
    }
    &__actions {
      width: 45px;
      text-align: center;
    }
  }
`;

export default TableRow;