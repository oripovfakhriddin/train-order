import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getCancelOrders } from "../../../redux/slices/cancel-orders";
import request from "../../../server/request";

const AdminCanceledOrdersPage = () => {
  const { loading, total, cancelOrders } = useAppSelector(
    (state) => state.cancelOrders
  );
  const dispatch = useAppDispatch();
  const [callback, setCallback] = useState(false);
  const [orderId, setOrderId] = useState<null | string>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const refetch = () => {
    setCallback(!callback);
  };

  useEffect(() => {
    dispatch(getCancelOrders());
  }, [dispatch, callback]);

  const showDeleteModal = (id: string) => {
    setIsDeleteModalOpen(true);
    setOrderId(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteOrder = async () => {
    try {
      const { data } = await request.delete(`order/delete`, {
        params: { id: orderId },
      });
      if (data.status === "SUCCESS") {
        closeDeleteModal();
        refetch();
        toast.success(data.data);
      }
    } finally {
      refetch();
    }
  };

  return (
    <Fragment>
      {loading ? (
        <div
          id="crud-modal"
          aria-hidden="true"
          className={`flex overflow-y-auto backdrop-blur overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        ></div>
      ) : (
        <section>
          <div className="flex items-center justify-between my-4">
            <div>
              <h1 className="text-xl ml-2">Buyurtmalar</h1>
            </div>
            <div>
              <h4 className="text-sm px-5 py-3 bg-sky-300 rounded-lg">
                Jami: {total}
              </h4>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-[16px] text-gray-700  bg-blue-400 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-2 py-3 text-center">
                    #
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Egasi
                  </th>
                  <th scope="col" className="px-2 py-3 text-center">
                    Boshlanish vaqti
                  </th>
                  <th scope="col" className="px-2 py-3 text-center">
                    Tugash vaqti
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Qayerdan
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Qayerga
                  </th>
                  <th scope="col" className="px-2 py-3 text-center">
                    Narxi($)
                  </th>
                  <th scope="col" className="px-2 py-3 text-center">
                    Holati
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-center
              "
                  >
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody>
                {cancelOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 hover:bg-gray-300 transition-all border-b dark:border-gray-700"
                  >
                    <th className="px-2 py-2 text-center">{index + 1}.</th>
                    <td className="px-2 py-2">{order.owner.fullName}</td>
                    <td className="px-2 py-2 text-center">
                      <p>{order.startTime.split(" ")[0]}</p>
                      <p>{order.startTime.split(" ")[1]}</p>
                    </td>
                    <td className="px-2 py-2 text-center">
                      {" "}
                      <p>{order.endTime.split(" ")[0]}</p>
                      <p>{order.endTime.split(" ")[1]}</p>
                    </td>
                    <td className="px-2 py-2">{order.fromWhere}</td>
                    <td className="px-2 py-2">{order.toWhere}</td>

                    <th
                      scope="row"
                      className="px-2 py-2 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order.price}
                    </th>
                    <td className="px-2 py-2 text-center">
                      {order?.cancel ? (
                        <button
                          type="button"
                          onClick={() => {
                            toast.info(
                              "Ushbu buyurtma allaqachon bekor qilingan!"
                            );
                          }}
                          className="focus:outline-none w-[132px] inline-flex items-center justify-center text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-gray-900"
                        >
                          Bekor qilingan
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="focus:outline-none inline-flex w-[130px] items-center justify-center text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-orange-900"
                        >
                          Bekor qilish
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-2 text-end flex items-center justify-end">
                      <button
                        onClick={() => {
                          showDeleteModal(order.id);
                        }}
                        className="focus:outline-none inline-flex items-center justify-between text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        <RiDeleteBin5Fill className="h-5 w-5  mr-2" />
                        O'chirish
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* START delete order Modal  */}
          <div
            className={`${
              isDeleteModalOpen ? "flex" : "hidden"
            } fixed backdrop-blur top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full`}
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeDeleteModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <svg
                    className="mx-auto mb-4 text-orange-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Bekor qilingan buyurtmani o'chirishni tasdiqlaysizmi?
                  </h3>
                  <button
                    type="button"
                    onClick={deleteOrder}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    Tasdiqlash
                  </button>
                  <button
                    type="button"
                    onClick={closeDeleteModal}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Bekor qilish
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* FINISH delete order Modal  */}
        </section>
      )}
    </Fragment>
  );
};

export default AdminCanceledOrdersPage;
