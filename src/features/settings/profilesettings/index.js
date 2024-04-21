import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Modules/Cards/TitleCard";
import TextAreaInput from "../../../components/Elements/Input/TextAreaInput";
import ToogleInput from "../../../components/Elements/Input/ToogleInput";
import InputText from "../../../components/Elements/Input/InputText";
import { showNotification } from "../../../redux/slices/headerSlice";

function ProfileSettings() {
  const dispatch = useDispatch();

  const updateProfile = () => {
    dispatch(showNotification({ message: "Profile Updated", status: 1 }));
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            labelTitle="Name"
            defaultValue="Taimoor"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Email"
            defaultValue="taimoor@taimoor.com"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Title"
            defaultValue="Software Engineer"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Place"
            defaultValue="Pakistan"
            updateFormValue={updateFormValue}
          />
        </div>
        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText
            labelTitle="Language"
            defaultValue="English"
            updateFormValue={updateFormValue}
          />
          <InputText
            labelTitle="Timezone"
            defaultValue="PST"
            updateFormValue={updateFormValue}
          />
          <ToogleInput
            updateType="syncData"
            labelTitle="Sync Data"
            defaultValue={true}
            updateFormValue={updateFormValue}
          />
        </div>

        <div className="mt-16">
          <button
            className="btn btn-primary float-right"
            onClick={() => updateProfile()}
          >
            Update
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
