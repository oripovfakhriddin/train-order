import * as yup from "yup";

import loginSchema from "../schema/login";

type FormValues = yup.InferType<typeof loginSchema>;

export default FormValues;
