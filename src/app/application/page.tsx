import Toast from "../components/Toast";
import Application from "./Application";
import ApplicationWrapper from "./ApplicationWrapper";

const page = () => {
  return (
    <ApplicationWrapper>
      <Application />
      <Toast />
    </ApplicationWrapper>
  );
};
export const dynamic = "force-dynamic";

export default page;
