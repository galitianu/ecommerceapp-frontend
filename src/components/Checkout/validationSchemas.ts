import * as yup from 'yup';
import { PaymentOption } from '@/types/entities';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const checkoutFormSchema = yup.object().shape({
  lastName: yup.string().required("is required"),
  firstName: yup.string().required("is required"),
  email: yup.string().email("is not valid").required("is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "is not valid")
    .min(4, "4 chars min")
    .required("s required"),
  address: yup.string().required("is required"),
  zipCode: yup
    .string()
    .matches(/^\d+$/, "must be a number")
    .min(6, "6 chars min")
    .required("is required"),
  city: yup.string().required("is required"),
  country: yup.string().required("is required"),
  paymentOption: yup
  .string()
  .required("is required"),
});

export default checkoutFormSchema;