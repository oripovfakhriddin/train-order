interface UserOrdersTypes {
  id: string;
  createdTime: string;
  updatedTime: string;
  createdBy: string;
  deletedBy: null | string;
  deletedTime: null | string;
  owner: {
    id: string;
    createdTime: string;
    updatedTime: string;
    createdBy: string;
    deletedBy: null | string;
    deletedTime: null | string;
    fullName: string;
    password: string;
    email: string;
    number: string;
    role: string;
    changeRoleBy: null | string;
    gender: string;
    updatedBy: null | string;
    enabled: boolean;
    username: string;
    authorities: [
      {
        authority: string;
      }
    ];
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    deleted: boolean;
  };
  fromWhere: string;
  toWhere: string;
  startTime: string;
  wagonId: string;
  endTime: string;
  price: number;
  changeStatusBy: null | string;
  cancel: boolean;
  deleted: boolean;
}

export default UserOrdersTypes;
