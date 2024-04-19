interface Wagon {
  capacity: string;
  createdBy: string;
  createdTime: string;
  deleted: boolean;
  deletedBy: null | string;
  deletedTime: null | string;
  description: string;
  id: string;
  number: string;
  orders: [];
  price: number;
  type: string;
  updatedBy: null | string;
  updatedTime: string;
}
export default Wagon;
