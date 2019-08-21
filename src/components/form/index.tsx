import styled from 'styled-components';

/**
 * All forms should be wrapped by this component
 */
export const Form = styled.form`
  .error-msg {
    display: block;
    padding: 4px 8px;
    color: ${p => p.theme.colors.white};
    background-color: ${p => p.theme.colors.danger};
    max-width: 80%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    .icon-wrap {
      margin-right: 8px;
      display: inline-block;
    }
  }

  .form__buttons {
    text-align: center;
      * + * {
        margin-left: 16px;
      }
    }
`;

Form.defaultProps = {
  noValidate: true
}

export default Form;

