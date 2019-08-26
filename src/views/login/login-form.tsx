import { Alert, Button, FormGroup } from '@blueprintjs/core';
import React, { PureComponent } from 'react';
import Form from '../../components/form';
import { ErrorMsg, TextInput } from '../../components/form/molecules';

import { Formik, FormikActions, FormikProps } from 'formik';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { authUser } from '../../api';
import { LStorage } from '../../api/localstorageHelpers';
import LoginSchema from './form-schema';

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormState {
  error: boolean;
  errorMsg: string;
}

class LoginForm extends PureComponent<RouteComponentProps, LoginFormState> {

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      error: false,
      errorMsg: '',
    }
  }

  public render() {

    return (
      <div>
        <Formik
          validationSchema={LoginSchema}
          initialValues={{ email: '', password: '', }}
          onSubmit={(values: LoginFormValues, actions: FormikActions<LoginFormValues>) => {
            const userCredentials = {
              email: values.email,
              password: values.password,
            };

            const getAuthData = async () => {
              return await authUser(userCredentials);
            }

            getAuthData().then(authData => {
              const { success, token, message } = authData;
              if (!success) {
                this.setState({
                  error: true,
                  errorMsg: message
                })
                actions.setSubmitting(false);
                return;
              }
              LStorage.setAuthToken(token);
              LStorage.setCurrentUserEmail(userCredentials.email);
              this.props.history.replace('/dashboard');
              actions.setSubmitting(false);
            })

          }}
          render={(props: FormikProps<LoginFormValues>) => {
            const { handleBlur, handleChange, touched, errors, values, submitForm } = props;
            return (
              <Form>

                <FormGroup label="Email" labelFor="email" labelInfo="(required)" >
                  <TextInput id="email" name="email" value={values.email}
                    onChange={handleChange} onBlur={handleBlur}
                    showerror={touched.email && errors.email ? 'true' : 'false'} 
                    type="email" autoComplete="username" />
                  <ErrorMsg name="email" />
                </FormGroup>

                <FormGroup label="Password" labelFor="password" labelInfo="(required)" >
                  <TextInput id="password" name="password" value={values.password}
                    onChange={handleChange} onBlur={handleBlur}
                    showerror={touched.password && errors.password ? 'true' : 'false'} 
                    type="password" autoComplete="new-password" />
                  <ErrorMsg name="password" />
                </FormGroup>

                <div className="form__buttons">
                  <Button loading={props.isSubmitting} onClick={submitForm}>
                    Login
                </Button>
                  <Button disabled={props.isSubmitting} onClick={() => props.resetForm()}>Clear form</Button>
                </div>
                <Alert isOpen={this.state.error}
                  confirmButtonText="Close"
                  onClose={() => this.setState({ error: false })}
                ><p>{this.state.errorMsg}</p></Alert>
              </Form>
            )
          }}
        />
      </div>
    );
  }
}

export default withRouter(LoginForm);