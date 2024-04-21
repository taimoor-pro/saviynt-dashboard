import { useDispatch } from "react-redux";
import { CONFIRMATION_MODAL_CLOSE_TYPES } from "../../../utils/globalConstantUtil";
import { deleteCustomer } from "../../../redux/slices/customerSlice";
import { showNotification } from "../../../redux/slices/headerSlice";

const ConfirmationModalBody = ({ extraObject, closeModal }) => {
  const dispatch = useDispatch();

  const { message, type, index } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.CUSTOMER_DELETE) {
      dispatch(deleteCustomer({ index }));
      dispatch(showNotification({ message: "Customer Deleted!", status: 1 }));
    }
    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          Yes
        </button>
      </div>
    </>
  );
};

export default ConfirmationModalBody;
