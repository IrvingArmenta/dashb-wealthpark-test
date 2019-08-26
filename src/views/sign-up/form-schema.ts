import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().min(4, 'User name should be longer')
    .max(16, 'User name should not be longer than 16 characters').required(),
  email: Yup.string().email('Invalid email').required(),
  password: Yup.string().min(5, 'password should be more than 5 characters long').required(),
  passConfirm: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
});

export default SignUpSchema;