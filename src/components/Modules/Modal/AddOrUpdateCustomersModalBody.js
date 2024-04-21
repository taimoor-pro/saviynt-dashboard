import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../Elements/Input/InputText";
import ErrorText from "../../Elements/Typography/ErrorText";
import { addNewCustomer } from "../../../redux/slices/customerSlice";
import { updateCustomer } from "../../../redux/slices/customerSlice";
import { showNotification } from "../../../redux/slices/headerSlice";

const INITIAL_CUSTOMER_OBJ = {
  first_name: "",
  email: "",
};

const AddOrUpdateCustomersModalBody = ({ closeModal, extraObject }) => {
  console.log("initialCustomerData", extraObject?.initialCustomerData);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [customerObj, setCustomerObj] = useState(INITIAL_CUSTOMER_OBJ);

  useEffect(() => {
    if (extraObject?.initialCustomerData) {
      setCustomerObj(extraObject?.initialCustomerData);
    }
  }, [extraObject?.initialCustomerData]);

  const saveNewOrUpdateCustomer = () => {
    if (customerObj.first_name.trim() === "")
      return setErrorMessage("Name is required!");
    else if (customerObj.email.trim() === "")
      return setErrorMessage("Email id is required!");
    else {
      if (extraObject?.initialCustomerData) {
        let updateCustomerObj = {
          id: extraObject?.initialCustomerData?.id,
          email: customerObj.email,
          first_name: customerObj.first_name,
          avatar: "https://reqres.in/img/faces/1-image.jpg",
        };
        dispatch(
          updateCustomer({
            index: extraObject?.initialCustomerData?.id,
            updatedCustomer: updateCustomerObj,
          })
        );
        dispatch(showNotification({ message: "Customer Updated!", status: 1 }));
      } else {
        let newCustomerObj = {
          id: 7,
          email: customerObj.email,
          first_name: customerObj.first_name,
          avatar: "https://reqres.in/img/faces/1-image.jpg",
        };
        dispatch(addNewCustomer({ newCustomerObj }));
        dispatch(
          showNotification({ message: "New Customer Added!", status: 1 })
        );
      }
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setCustomerObj({ ...customerObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={
          customerObj.first_name || extraObject?.initialCustomerData?.first_name
        }
        updateType="first_name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
        placeholder="Customer Name"
      />

      <InputText
        type="email"
        defaultValue={
          customerObj.email || extraObject?.initialCustomerData?.email
        }
        updateType="email"
        containerStyle="mt-4"
        labelTitle="Email"
        updateFormValue={updateFormValue}
        placeholder="Email"
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewOrUpdateCustomer()}
        >
          {extraObject?.initialCustomerData ? "Update" : "Save"}
        </button>
      </div>
    </>
  );
};

export default AddOrUpdateCustomersModalBody;
