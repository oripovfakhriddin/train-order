import * as yup from "yup";

const orderSchema = yup.object().shape({
  startTimeDay: yup.string().required(),
  startTimeDate: yup.string().required(),
  fromWhere: yup.string().required(),
  toWhere: yup.string().required(),
  endTimeDay: yup.string().required(),
  endTimeDate: yup.string().required(),
});

export default orderSchema;
