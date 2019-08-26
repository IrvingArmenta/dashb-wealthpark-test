import { Alert, Button, Dialog, FormGroup, Radio, RadioGroup } from '@blueprintjs/core';
import React, { PureComponent } from 'react';
import Form from '../../components/form';
import { ErrorMsg, TextInput } from '../../components/form/molecules';

import { Formik, FormikActions, FormikProps } from 'formik';
import { updateUser, User } from '../../api';
import { LStorage } from '../../api/localstorageHelpers';
import { removeFalsy } from '../../util/helpers';

interface EditUserFormProps {
  selectedUser: Omit<User, 'password'>;
  isOpen: boolean;
  onClose: () => void;
  fetchUsers: () => void;
}

interface EditUserFormValues {
  name: string;
  password: string;
  passConfirm: string;
  email: string;
  role: string;
}

interface EditUserFormState {
  success: boolean;
  error: boolean;
  selectedUser: Omit<User, 'password'>;
}

class EditUserForm extends PureComponent<EditUserFormProps, EditUserFormState> {

  constructor(props: EditUserFormProps) {
    super(props);
    this.state = {
      success: false,
      error: false,
      selectedUser: this.props.selectedUser
    }
  }

  public render() {
    const { error, selectedUser } = this.state;

    return (
      <Dialog isOpen={this.props.isOpen}
        onClose={this.props.onClose}
        title="Edit User Info"
        icon="edit"
      >

        <Formik
          initialValues={{
            name: selectedUser.name,
            password: '',
            email: selectedUser.email,
            passConfirm: '',
            role: selectedUser.role
          }}
          onSubmit={(values: EditUserFormValues, actions: FormikActions<EditUserFormValues>) => {

            const emailCheck = selectedUser.email === values.email;

            if (selectedUser.name === values.name &&
              selectedUser.email === values.email &&
              selectedUser.role === values.role) {
              alert('nothing to update');
              this.props.onClose();
              return false;
            }

            const updatedData = {
              name: values.name,
              email: emailCheck ? '' : values.email,
              role: values.role,
              password: values.password
            }


            updateUser(this.state.selectedUser.id, removeFalsy(updatedData), LStorage.getAuthToken()).then(res => {

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
                this.props.fetchUsers();
                this.props.onClose();
              }
            })

          }}
          render={(props: FormikProps<EditUserFormValues>) => {
            const { handleBlur, handleChange, touched, errors, values, submitForm } = props;
            return (
              <>
                <div className="bp3-dialog-body">
                  <Form>
                    <FormGroup label="Edit Name" labelFor="name" labelInfo="(required)">
                      <TextInput id="name" name="name" value={values.name}
                        onChange={handleChange} onBlur={handleBlur}
                        showerror={touched.name && errors.name} />
                      <ErrorMsg name="name" />
                    </FormGroup>

                    <FormGroup label="Edit Email" labelFor="email" labelInfo="(required)" >
                      <TextInput id="email" name="email" value={values.email}
                        onChange={handleChange} onBlur={handleBlur}
                        showerror={touched.email && errors.email ? 'true' : 'false'}
                        type="email" autoComplete="username" />
                      <ErrorMsg name="email" />
                    </FormGroup>

                    <FormGroup label="New Password" labelFor="password" labelInfo="(required)" >
                      <TextInput id="password" name="password" value={values.password}
                        onChange={handleChange} onBlur={handleBlur}
                        showerror={touched.password && errors.password ?'true' :'false'}
                        type="password" autoComplete="new-password" />
                      <ErrorMsg name="password" />
                    </FormGroup>

                    <FormGroup label="New Password Confirmation" labelFor="passConfirm" labelInfo="(required)" >
                      <TextInput id="passConfirm" name="passConfirm" value={values.passConfirm}
                        onChange={handleChange} onBlur={handleBlur}
                        showerror={touched.password && errors.password ? 'true' : 'false'}
                        type="password" autoComplete="new-password" />
                      <ErrorMsg name="passConfirm" />
                    </FormGroup>

                    <RadioGroup
                      label="role"
                      onChange={handleChange}
                      selectedValue={values.role}
                      inline={true}
                      name="role"
                    >
                      <Radio label="User" value="user" />
                      <Radio label="Admin" value="admin" />
                    </RadioGroup>
                  </Form>
                </div>
                <div className="bp3-dialog-footer">
                  <div className="bp3-dialog-footer-actions">
                    <Button loading={props.isSubmitting} onClick={submitForm}>
                      Update user info
                    </Button>
                  </div>
                </div>
                <Alert isOpen={error}
                  confirmButtonText="Close"
                  onClose={() => this.setState({ error: false })}
                  onClosing={() => {
                    props.setFieldValue('email', '');
                    props.setFieldTouched('email', false);
                  }} ><p>Unhandled Error</p></Alert>
              </>
            )
          }}
        />

      </Dialog>
    );
  }
}

export default EditUserForm;