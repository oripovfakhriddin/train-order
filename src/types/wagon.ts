import * as yup from "yup";

import wagonSchema from "../schema/wagon";

type WagonFormValues = yup.InferType<typeof wagonSchema>;

export default WagonFormValues;
