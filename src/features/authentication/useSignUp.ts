import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { signUp as signUpApi, type AuthI } from "../../services/apiAuth";

function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: ({ fullName, email, password }: AuthI) =>
      signUpApi({ fullName, email, password }),
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify new account from user's email address",
      );
    },
  });
  return { signUp, isPending };
}

export default useSignUp;
