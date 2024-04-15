import * as yup from "yup";

// const numberRegExp = /^\+9989[012345789][0-9]{7}$/;
// const numberRegExp =
  // /^\+998([- ])?(90|91|93|94|95|98|99|33|97|71)([- ])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/;

const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Satrni to'ldirish shart")
    .min(3, "Satr kamida 3 ta belgidan iborat boʻlishi kerak"),
  email: yup
    .string()
    .email("Kiritilgan email mavjud emas!")
    .required("Satrni to'ldirish shart"),
  number: yup
    .number()
    .required("Satrni to'ldirish shart"),
    // .matches(numberRegExp, "Telefon raqam mavjud emas"),
  gender: yup.string().required("Satrni to'ldirish shart"),
  username: yup.string().required("Satrni to'ldirish shart"),
  password: yup
    .string()
    .min(4, "Satr kamida 4 ta belgidan iborat boʻlishi kerak"),
});

export default registerSchema;
