import { Alert, Button, FormGroup} from '@blueprintjs/core';
import React, { PureComponent } from 'react';
import Form from '../../components/form';
import { ErrorMsg, TextInput } from '../../components/form/molecules';

import { Formik, FormikActions, FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import { createUser } from '../../api';
import SignUpSchema from './form-schema';

interface SignUpFormValues {
  name: string;
  password: string;
  passConfirm: string;
  email: string;
}

interface SignUpFormState {
  success: boolean;
  error: boolean;
}

class SignUpForm extends PureComponent<{}, SignUpFormState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      success: false,
      error: false,
    }
  }

  public render() {
    const { success, error } = this.state;

    if (success) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h2>User was created</h2>
          <Link to="/login">Go to login</Link>
        </div>
      )
    }

    return (
      <div>
        <Formik
          initialValues={{ name: '', password: '', email: '', passConfirm: '' }}
          validationSchema={SignUpSchema}
          onSubmit={(values: SignUpFormValues, actions: FormikActions<SignUpFormValues>) => {

            // user.id is assigned by mongodb
            const reqBody = {
              name: values.name,
              email: values.email,
              password: values.password,
              role: "user"
            };

            setTimeout(() => {
              createUser(reqBody).then(res => {

                if (!res) {
                  // alert('Email already exists');
                  this.setState({
                    error: true,
                  });
                  actions.setSubmitting(false);
                } else {
                  this.setState({
                    success: true,
                  });
                  actions.setSubmitting(false);
                }
              })
            }, 500);

          }}
          render={(props: FormikProps<SignUpFormValues>) => {
            const { handleBlur, handleChange, touched, errors, values, submitForm } = props;
            return (
              <Form>
                <FormGroup label="Name" labelFor="name" labelInfo="(required)">
                  <TextInput id="name" name="name" value={values.name}
                    onChange={handleChange} onBlur={handleBlur}
                    showerror={touched.name && errors.name ? 'true' : 'false'} />
                  <ErrorMsg name="name" />
                </FormGroup>

                <FormGroup label="Email" labelFor="email" labelInfo="(required)" >
                  <TextInput id="email" name="email" value={values.email}
                    onChange={handleChange} onBlur={handleBlur}
                    showerror={touched.email && errors.email ? 'true' : 'false'} type="email" autoComplete="username" />
                  <ErrorMsg name="email" />
                </FormGroup>

                <FormGroup label="Password" labelFor="password" labelInfo="(required)" >
                  <TextInput id="password" name="password" value={values.password}
                    onChange={handleChange} onBlur={handleBlur}
                    showerror={touched.password && errors.password ? 'true' : 'false'} 
                    type="password" autoComplete="new-password" />
                  <ErrorMsg name="password" />
                </FormGroup>

                <FormGroup label="Password confirmation" labelFor="passConfirm" labelInfo="(required)" >
                  <TextInput id="passConfirm" name="passConfirm" value={values.passConfirm}
                    onChange={handleChange} onBlur={handleBlur}
                    showerror={touched.passConfirm && errors.passConfirm ?'true': 'false'} 
                    type="password" autoComplete="new-password" />
                  <ErrorMsg name="passConfirm" />
                </FormGroup>

                <div className="form__buttons">
                  <Button loading={props.isSubmitting} onClick={submitForm}>
                    Sign up new user
                </Button>
                  <Button disabled={props.isSubmitting} onClick={() => props.resetForm()}>Clear form</Button>
                </div>
                <Alert isOpen={error}
                  confirmButtonText="Close"
                  onClose={() => this.setState({ error: false })}
                  onClosing={() => { 
                    props.setFieldValue('email', ''); 
                    props.setFieldTouched('email', false); 
                  }} ><p>Email already exists, please enter another email</p></Alert>
              </Form>
            )
          }}
        />
      </div>
    );
  }
}

export default SignUpForm;