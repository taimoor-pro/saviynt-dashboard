import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TitleCard from "../../components/Modules/Cards/TitleCard";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import { ChevronUpDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { getCustomersContent } from "../../redux/slices/customerSlice";
import { openModal } from "../../redux/slices/modalSlice";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewOrUpdateCustomerModal = () => {
    dispatch(
      openModal({
        title: "Add New Customer",
        bodyType: MODAL_BODY_TYPES.CUSTOMER_ADD_NEW_OR_UPDATE,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewOrUpdateCustomerModal()}
      >
        <PlusIcon className="w-5" /> ADD NEW CUSTOMER
      </button>
    </div>
  );
};

const Customers = () => {
  const [sortByEnable, setSortByEnable] = useState(true);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const { customers } = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  const openAddNewOrUpdateCustomerModal = (customerData) => {
    console.log(customerData, "customnklsncn");
    dispatch(
      openModal({
        title: "Update Customer",
        bodyType: MODAL_BODY_TYPES.CUSTOMER_ADD_NEW_OR_UPDATE,
        extraObject: { initialCustomerData: customerData },
      })
    );
  };

  useEffect(() => {
    dispatch(getCustomersContent());
  }, []);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      setSortByEnable(!sortByEnable);
    } else {
      setSortByEnable(!sortByEnable);
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    if (sortBy === "id") {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    } else if (sortBy === "name") {
      const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
      const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    } else if (sortBy === "email") {
      return sortOrder === "asc"
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    }
    return 0;
  });

  const deleteCurrentCustomer = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this customer?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.CUSTOMER_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Customers"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="cursor-pointer" onClick={() => handleSort("id")}>
                  <div className="flex items-center">
                    Customer ID
                    <ChevronUpDownIcon className="ms-1 w-4" />
                  </div>
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Customer Name
                    <ChevronUpDownIcon className="ms-1 w-4" />
                  </div>
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center">
                    Customer Email
                    <ChevronUpDownIcon className="ms-1 w-4" />
                  </div>
                </th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers?.length > 0 ? (
                sortedCustomers?.map((l, k) => {
                  return (
                    <tr key={k}>
                      <td>00{l.id}</td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={l.avatar} alt="Avatar" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{l.first_name}</div>
                            <div className="text-sm opacity-50">
                              {l.last_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{l.email}</td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() =>
                            openAddNewOrUpdateCustomerModal({
                              id: k,
                              first_name: l.first_name,
                              email: l.email,
                            })
                          }
                        >
                          <PencilIcon className="w-5" />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => deleteCurrentCustomer(k)}
                        >
                          <TrashIcon className="w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p className="mt-5 text-center font-bold">No Data Found....</p>
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
};

export default Customers;
