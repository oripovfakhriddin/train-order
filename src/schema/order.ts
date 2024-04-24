import * as yup from "yup";

const orderSchema = yup.object().shape({
  startTimeDay: yup.string().required("Satrni to'ldirish shart"),
  startTimeDate: yup.string().required("Satrni to'ldirish shart"),
  fromWhere: yup.string().required("Satrni to'ldirish shart"),
  toWhere: yup.string().required("Satrni to'ldirish shart"),
  endTimeDay: yup.string().required("Satrni to'ldirish shart"),
  endTimeDate: yup.string().required("Satrni to'ldirish shart"),
});

export default orderSchema;
