import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup.string().required("Satrni to'ldirish shart"),
  password: yup
    .string()
    .min(4, "Satr kamida 4 ta belgidan iborat boʻlishi kerak"),
});

export default loginSchema;
