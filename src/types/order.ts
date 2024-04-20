import * as yup from "yup";

import orderSchema from "../schema/order";

type OrderFormValues = yup.InferType<typeof orderSchema>;

export interface Order {
  startTime: "string";
  endTime: "string";
  wagonId: "string";
  fromWhere: "string";
  toWhere: "string";
}

export default OrderFormValues;
