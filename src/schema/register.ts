import * as yup from "yup";

const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Satrni to'ldirish shart")
    .min(3, "Satr kamida 3 ta belgidan iborat boʻlishi kerak"),
  email: yup
    .string()
    .email("Kiritilgan email mavjud emas!")
    .required("Satrni to'ldirish shart"),
  number: yup.string().required("Satrni to'ldirish shart"),
  gender: yup.string().required("Satrni to'ldirish shart"),
  username: yup.string().required("Satrni to'ldirish shart"),
  password: yup
    .string()
    .min(4, "Satr kamida 4 ta belgidan iborat boʻlishi kerak"),
});

export default registerSchema;
