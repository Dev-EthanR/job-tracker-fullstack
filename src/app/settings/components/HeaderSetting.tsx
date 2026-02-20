import { User } from "@/src/generated/prisma/client";

const HeaderSetting = ({ user }: { user: User }) => {
  return (
    <div>
      <h2>{user.name || "guest"}</h2>
      <h3>{user.email}</h3>
    </div>
  );
};

export default HeaderSetting;
