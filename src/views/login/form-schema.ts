import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required(),
  password: Yup.string().min(5, 'password should be more than 5 characters long').required(),
});

export default LoginSchema;