import React from 'react';
import { StyledContent } from './Content.style';

export type ContentTypes = {
  children?: React.ReactNode;
  p?: React.ReactText;
};

const Content = (props: ContentTypes) => {
  return <StyledContent className="main">{props.children}</StyledContent>;
};

export default Content;
