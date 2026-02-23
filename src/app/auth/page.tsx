import { redirect } from "next/navigation";
import { auth } from "./auth";
import AuthWrapper from "./AuthWrapper";
import SignIn from "./views/SignIn";

const page = async () => {
  const session = await auth();
  if (session?.user) redirect("/application");
  return (
    <AuthWrapper>
      <SignIn />
    </AuthWrapper>
  );
};

export default page;
