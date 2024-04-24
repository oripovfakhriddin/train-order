import * as yup from "yup";

const wagonSchema = yup.object().shape({
  number: yup.string().required("Satrni to'ldirish shart"),
  type: yup.string().required("Satrni to'ldirish shart"),
  description: yup.string().required("Satrni to'ldirish shart"),
  capacity: yup.string().required("Satrni to'ldirish shart"),
});

export default wagonSchema;
