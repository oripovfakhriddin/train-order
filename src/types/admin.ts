import * as yup from "yup";

import adminSchema from "../schema/admin";

type AdminFormValues = yup.InferType<typeof adminSchema>;

export default AdminFormValues;
