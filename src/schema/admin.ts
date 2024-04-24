import * as yup from "yup";

const adminSchema = yup.object().shape({
  email: yup
    .string()
    .required("Satrni to'ldirish shart")
    .email("Kiritilgan email mavjud emas!"),
});

export default adminSchema;
