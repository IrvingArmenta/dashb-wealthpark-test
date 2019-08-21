import { Icon, InputGroup } from '@blueprintjs/core';
import { Classes } from '@blueprintjs/core';
import { ErrorMessage, ErrorMessageProps } from 'formik';
import { rgba } from 'polished';
import React from 'react';
import styled from 'styled-components';

interface TextInputType {
  showerror?: string | boolean;
}

// APP CUSTOM INPUT
export const TextInput = styled(InputGroup) <TextInputType>`
  .${Classes.INPUT} {
    border-color: ${p => !p.showerror ? "#fff" : p.theme.colors.danger};
    &:focus {
      box-shadow: ${p => !p.showerror ? 
        '0 0 0 1px #137cbd, 0 0 0 3px rgba(19, 124, 189, 0.3), inset 0 1px 1px rgba(16, 22, 26, 0.2)' 
      : `0 0 0 1px ${p.theme.colors.danger}, 0 0 0 3px ${rgba(p.theme.colors.danger, 0.3)}, inset 0 1px 1px ${rgba(p.theme.colors.danger, 0.2)}`};
    }
  }
`;

TextInput.defaultProps = {
  large: true,
  type: "text",
}

export const ErrorMsg = (props: ErrorMessageProps) => {
  const { name, className } = props;
  return (
    <ErrorMessage name={name} className={className} render={msg => (
      <span className="error-msg">
        <span className="icon-wrap">
          <Icon icon="error" />
        </span>
        {msg}
      </span>
    )} />
  );
};