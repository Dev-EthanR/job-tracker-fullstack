import Toast from "../components/Toast";
import ClearData from "./components/ClearData";
import DefaultLabel from "./components/DefaultLabel";
import DeleteConfirmation from "./components/DeleteConfirmation";
import Theme from "./components/Theme";
import SettingsWrapper from "./SettingsWrapper";

const page = () => {
  return (
    <SettingsWrapper>
      <ClearData />
      <DefaultLabel />
      <DeleteConfirmation />
      <Theme />
      <Toast />
    </SettingsWrapper>
  );
};

export default page;
