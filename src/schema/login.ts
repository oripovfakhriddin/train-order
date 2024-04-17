import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Satrni to'ldirish shart")
    .email("Kiritilgan email mavjud emas!"),
  password: yup
    .string()
    .min(4, "Satr kamida 4 ta belgidan iborat boʻlishi kerak"),
});

export default loginSchema;
