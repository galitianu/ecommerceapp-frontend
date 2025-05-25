import * as yup from 'yup';

const registrationSchema = yup.object().shape({
  lastName: yup.string().required('is required'),
  firstName: yup.string().required('is required'),
  email: yup.string().email('invalid').required('is required'),
  password: yup
    .string()
    .min(4, 'min 4 chars')
    .required('is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'must match')
    .required('is required'),
});

export default registrationSchema;
