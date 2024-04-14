import * as yup from "yup";

import registerSchema from "../schema/register";

type RegisterFormValues = yup.InferType<typeof registerSchema>;

export default RegisterFormValues;
