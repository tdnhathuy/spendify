import { useSession } from "next-auth/react";

export const useAuth = () => {
  const { data } = useSession();
  const user = data?.user;
  return {
    user: user,
  };
};
