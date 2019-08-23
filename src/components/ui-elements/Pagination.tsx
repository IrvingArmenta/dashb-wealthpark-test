import React from 'react';
import styled from 'styled-components';
import { pxToRem } from '../../global-styles/GlobalStyle';

interface PaginationProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  buttonOnClick: (index: number) => void;

}

const PaginationJSX = (props: PaginationProps) => {
  const { className, currentPage, buttonOnClick, totalPages } = props;
  const buttons: any[] = [];
  for (let i = 1; i <= totalPages; i = i + 1) {
    buttons.push(
      <li key={`page${i}`} className={`page-item ${currentPage === i ? "active" : ""}`} >
          {currentPage === i ?
            <span className="page-button">{i}</span> :
            <button onClick={() => buttonOnClick(i) } className="page-button">{i}</button>}
        </li>
    )
  }
  return (
    <ul className={className}>
      {buttons}
    </ul>
  )
};

const Pagination = styled(PaginationJSX)`
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: .25rem;
    justify-content: center;

    .page-item {
      &.active {
        .page-button{
          z-index: 1;
          color: #fff;
          background-color:${p => p.theme.colors.primary};
          border-color:${p => p.theme.colors.primary};
        }
      }
      &:first-child {
        .page-button{
          margin-left: 0;
          border-top-left-radius: .25rem;
          border-bottom-left-radius: .25rem;
        }
      }
    }

    .page-button{
      cursor: pointer;
      position: relative;
      display: block;
      padding: ${pxToRem('8px') + ' ' + pxToRem('12px')};
      margin-left: -1px;
      line-height: 1.25;
      color:${p => p.theme.colors.primary};
      background-color: #fff;
      border: 1px solid #dee2e6;
      &:hover {
        z-index: 2;
        color: #0056b3;
        text-decoration: none;
        background-color: #e9ecef;
        border-color: #dee2e6;
      }
    }

`;



export default Pagination;