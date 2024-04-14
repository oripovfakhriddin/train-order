import * as yup from "yup";

import loginSchema from "../schema/login";

type LoginFormValues = yup.InferType<typeof loginSchema>;

export default LoginFormValues;
