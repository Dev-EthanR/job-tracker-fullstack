import { prisma } from "@/prisma/lib/prisma";
import Toast from "../components/Toast";
import ClearData from "./components/ClearData";
import DefaultLabel from "./components/DefaultLabel";
import DeleteConfirmation from "./components/DeleteConfirmation";
import Theme from "./components/Theme";
import SettingsWrapper from "./SettingsWrapper";
import HeaderSetting from "./components/HeaderSetting";
import { redirect } from "next/navigation";
import { auth } from "../auth/auth";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/auth");
  const account = await prisma.account.findFirst({
    where: {
      userId: session.user?.id,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: account?.userId,
    },
  });
  return (
    <SettingsWrapper>
      <HeaderSetting user={user!} />
      <ClearData />
      <DefaultLabel />
      <DeleteConfirmation />
      <Theme />
      <Toast />
    </SettingsWrapper>
  );
};

export default page;
